import * as z from "zod";

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters is required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  code: z.string().optional(),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Minimum of 6 characters is required" }),
  name: z.string().min(1, { message: "Name is required" }),
});

export type LoginProps = z.infer<typeof LoginSchema>;
export type ResetProps = z.infer<typeof ResetSchema>;
export type RegisterProps = z.infer<typeof RegisterSchema>;
export type NewPasswordProps = z.infer<typeof NewPasswordSchema>;
