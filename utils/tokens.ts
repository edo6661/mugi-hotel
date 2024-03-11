import { db } from "@/lib/db";
import { getPasswordResetByEmail } from "@/services/reset";
import { getVerificationTokenByEmail } from "@/services/verification";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import { getTwoFactorByEmail } from "@/services/twofactor";
export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  // ! token expired in 1 hour
  const expiresAt = new Date(new Date().getTime() + 3600 * 1000);

  const tokenExist = await getVerificationTokenByEmail(email);

  if (tokenExist)
    await db.verificationToken.delete({ where: { id: tokenExist.id } });

  const newVerificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expiresAt,
    },
  });
  return newVerificationToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  // ! token expired in 1 hour
  const expiresAt = new Date(new Date().getTime() + 3600 * 1000);

  const tokenExist = await getPasswordResetByEmail(email);
  if (tokenExist) {
    await db.passwordResetToken.delete({ where: { id: tokenExist.id } });
  }

  return await db.passwordResetToken.create({
    data: {
      email,
      token,
      expiresAt,
    },
  });
};

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  // ! token expired in 1 hour
  const expiresAt = new Date(new Date().getTime() + 3600 * 1000);

  const tokenExist = await getTwoFactorByEmail(email);
  if (tokenExist) {
    await db.twoFactorToken.delete({ where: { id: tokenExist.id } });
  }
  return await db.twoFactorToken.create({
    data: {
      email,
      token,
      expiresAt,
    },
  });
};
