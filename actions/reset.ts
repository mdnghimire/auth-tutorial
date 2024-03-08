"use server";

import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { getUsersByEmail } from "@/lib/user";
import { ResetProps, ResetSchema } from "@/schemas/index";

export const reset = async (values: ResetProps) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid email!" };
  }
  const { email } = validatedFields.data;
  const existingUser = await getUsersByEmail(email);

  if (!existingUser) {
    return { error: "Email not found!" };
  }
  // todo : generate email and send email
  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );
  return { success: "Reset email sent!" };
};
