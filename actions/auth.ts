"use server";
import { signIn, signOut } from "@/auth";
import { db } from "@/lib/db";
import {
  sendPasswordResetEmail,
  sendTwoFactorEmail,
  sendVerificationEmail,
} from "@/lib/mail";
import {
  LoginSchemaType,
  NewPasswordSchemaType,
  RegisterSchemaType,
  ResetSchemaType,
  loginSchema,
  newPasswordSchema,
  registerSchema,
  resetSchema,
} from "@/lib/zod/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import {
  getTwoFactorByEmail,
  getTwoFactorByUserId,
} from "@/services/twofactor";
import { getUserByEmail } from "@/services/user";
import { errorHandler } from "@/utils";
import {
  generatePasswordResetToken,
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/utils/tokens";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

export const register = async (data: RegisterSchemaType) => {
  const validatedFields = registerSchema.safeParse(data);
  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { email, password, name } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingname = await db.user.findUnique({
    where: {
      name,
    },
  });
  const existingEmail = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existingname) return { error: "Name already exists!" };

  if (existingEmail) return { error: "Email already exists!" };

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // ! bikin token
  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);
  // TODO send verification email
  return { success: "Confirmation Email Sent!" };
};

export const login = async (data: LoginSchemaType) => {
  const validatedFields = loginSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, code } = validatedFields.data;

  const userExist = await getUserByEmail(email);

  if (!userExist || !userExist.email || !userExist.password)
    return { error: "Email does'nt exist!" };

  // ! bikin token ulang jika belum verified, karena token bakal expired setelah 1 jam user register
  if (!userExist.emailVerified) {
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Email not verified! Confirmation Email Sent!" };
  }

  if (userExist.isTwoFactorEnabled && userExist.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorByEmail(userExist.email);
      if (!twoFactorToken) return { error: "Token does'nt exist!" };

      if (twoFactorToken.token !== code) return { error: "Invalid code!" };

      const hasExpired = new Date(twoFactorToken.expiresAt) < new Date();
      if (hasExpired) return { error: "Token has expired!" };

      await db.twoFactorToken.delete({
        where: {
          id: twoFactorToken.id,
        },
      });

      const existingTwoFactor = await getTwoFactorByUserId(userExist.id);

      if (existingTwoFactor) {
        await db.twoFactor.delete({
          where: {
            id: existingTwoFactor.id,
          },
        });
      }

      await db.twoFactor.create({
        data: {
          userId: userExist.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(userExist.email);
      await sendTwoFactorEmail(userExist.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }

  try {
    return await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return error.type === "CredentialsSignin"
        ? { error: "Invalid email or password!" }
        : { error: "Something went wrong! Please try again later." };
    }
  }
};

export const resetPassword = async (data: ResetSchemaType) => {
  const validatedFields = resetSchema.safeParse(data);
  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { email } = validatedFields.data;

  const userExist = await getUserByEmail(email);

  if (!userExist) return { error: "Email not found!" };

  // TODO send reset password email
  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return {
    success: "Email sent! Please check your email to reset your password.",
  };
};

export const newPassword = async (
  data: NewPasswordSchemaType,
  token?: string
) => {
  const validatedFields = newPasswordSchema.safeParse(data);
  if (!validatedFields.success) return { error: "Invalid fields!" };
  if (!token) return { error: "Token does'nt exist!" };

  const { password } = validatedFields.data;

  const tokenExist = await db.passwordResetToken.findUnique({
    where: {
      token,
    },
  });

  if (!tokenExist) return { error: "Invalid Token!" };

  const hasExpired = new Date(tokenExist.expiresAt) < new Date();
  if (hasExpired) return { error: "Token has expired!" };

  const existingUser = await getUserByEmail(tokenExist.email);
  if (!existingUser) return { error: "User not found!" };

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: {
      email: tokenExist.email,
    },
    data: {
      password: hashedPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: {
      id: tokenExist.id,
    },
  });

  return { success: "Password reset successfully!" };
};
