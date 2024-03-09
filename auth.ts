import authConfig from "@/auth.config";
import { db } from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/lib/two-factor-confirmation";
import { getUsersById } from "@/lib/user";
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
      console.log("check user account", user, account);
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUsersById(user?.id || "");
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
    async session({ session, user, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }
      console.log({ sessionToken: token, session });

      return session;
    },
    async jwt({ token, account }) {
      console.log("check token here", token);
      // Persist the OAuth access_token to the token right after signin
      if (!token.sub) return token;
      const existingUser = await getUsersById(token.sub);
      if (!existingUser) return token;
      token.role = existingUser.role;
      console.log({ token });
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
