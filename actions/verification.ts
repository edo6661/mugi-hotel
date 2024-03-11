"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/services/user";
import { getVerificationTokenByToken } from "@/services/verification";

export const newVerification = async (token: string) => {
  const tokenExist = await getVerificationTokenByToken(token);
  if (!tokenExist) return { error: "Token not found" };

  const hasExpired = new Date(tokenExist.expiresAt) < new Date();
  if (hasExpired) return { error: "Token has expired" };

  const userExist = await getUserByEmail(tokenExist.email);
  if (!userExist) return { error: "User not found" };

  await db.user.update({
    where: { id: userExist.id },
    data: {
      emailVerified: new Date(),
      // ! kalo emailVerified diupdate, buat token baru untuk email yang baru
      email: userExist.email,
    },
  });

  await db.verificationToken.delete({
    where: { id: tokenExist.id },
  });

  return { success: "Email Verified" };
};
