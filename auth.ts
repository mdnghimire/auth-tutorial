import authConfig from "@/auth.config";
import { getAccountByUserId } from "@/lib/account";
import { db } from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/lib/two-factor-confirmation";
import { getUserById } from "@/lib/user";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import NextAuth from "next-auth";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: { emailVerified: new Date() },
      });
    },
  },

  callbacks: {
    async signIn({ user, account }) {
      // console.log("check provider here", user, account);
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user?.id || "");
      // prevent sign in without email verification
      if (!existingUser?.emailVerified) return false;

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );
        if (!twoFactorConfirmation) return false;

        // Delete two factor confirmation for next sign in
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }
      return true;
    },
    async session({ session, user, token }: any) {
      // console.log("check token here", token);
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      // for okta provider session
      if (token && token.accessToken) {
        // console.log('check token here', token.accessToken);
        try {
          const response = await fetch(
            "https://dev-09426885.okta.com/oauth2/default/v1/userinfo",
            {
              headers: {
                Authorization: `Bearer ${token.accessToken}`,
              },
            }
          );

          if (response.ok) {
            const userData = await response.json();
            session.user = {
              id: userData.sub,
              name: userData.name,
              locale: userData.locale,
              nickname: userData.nickname,
              preferred_username: userData?.preferred_username,
              given_name: userData.given_name,
              middle_name: userData.middle_name,
              family_name: userData.family_name,
              email: userData.email,
              zoneinfo: userData.zoneinfo,
              email_verified: userData.email_verified,
            };
            console.log("check user data ", userData, token);
          } else {
            console.error(
              "Error fetching user information:",
              response.statusText
            );
            // Handle error as needed
          }
        } catch (error) {
          console.error("Error fetching user information:", error);
          // Handle error as needed
        }
      }

      return session;
    },
    async jwt({ token, account }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      // console.log({ token });
      if (account) {
        token.accessToken = account.access_token;
      }
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
