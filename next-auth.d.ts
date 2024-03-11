import { UserRole } from "@prisma/client";
import { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
  locale: string;
  nickname: string;
  preferred_username: string;
  given_name: string;
  middle_name: string;
  family_name: string;
  zoneinfo: string;
  email_verified: any;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
