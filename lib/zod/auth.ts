import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2, {
    message: "name is too short",
  }),
  password: z.string().min(6, {
    message: "Password is too short",
  }),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;

export const defaultValuesRegister: RegisterSchemaType = {
  email: "",
  name: "",
  password: "",
};

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password is too short",
  }),
  code: z.optional(z.string()),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export const defaultValuesLogin: LoginSchemaType = {
  email: "",
  password: "",
  code: "",
};

export const resetSchema = z.object({
  email: z.string().email(),
});

export type ResetSchemaType = z.infer<typeof resetSchema>;

export const defaultValuesReset: ResetSchemaType = {
  email: "",
};

export const newPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Password is too short",
  }),
});

export type NewPasswordSchemaType = z.infer<typeof newPasswordSchema>;

export const defaultValuesNewPassword: NewPasswordSchemaType = {
  password: "",
};
