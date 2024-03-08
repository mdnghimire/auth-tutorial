"use server";

import { db } from "@/lib/db";
import { sendverificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { getUsersByEmail } from "@/lib/user";
import { RegisterProps, RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";

export const register = async (values: RegisterProps) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid credentials" };
  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUsersByEmail(email);
  if (existingUser) {
    return { error: "Email already in use!" };
  }
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  await sendverificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation email send!" };
};
