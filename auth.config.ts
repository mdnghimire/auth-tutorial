import { getUsersByEmail } from "@/lib/user";
import { LoginSchema } from "@/schemas/index";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";

import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import Okta from "@auth/core/providers/okta";

export default {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    Okta({
      clientId: process.env.OKTA_CLIENT_ID,
      clientSecret: process.env.OKTA_CLIENT_SECRET,
      issuer: process.env.OKTA_ISSUER,
      profile(profile) {
        return {
          // Return all the profile information you need.
          // The only truly required field is `id`
          // to be able identify the account when added to a database
        };
      },
    }),

    Credentials({
      async authorize(credentials): Promise<any> {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUsersByEmail(email);
          if (!user || !user.password) {
            return null;
          }
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
