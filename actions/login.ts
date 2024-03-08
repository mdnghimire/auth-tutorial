"use server";
import { signIn } from "@/auth";
import { sendverificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { getUsersByEmail } from "@/lib/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginProps, LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";

export const login = async (values: LoginProps) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid credentials" };
  const { email, password } = validatedFields.data;

  const existingUser = await getUsersByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );
    await sendverificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Confirmation email sent!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };

        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
};
