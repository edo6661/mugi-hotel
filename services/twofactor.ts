import { db } from "@/lib/db";
import { errorHandler } from "@/utils";

export const getTwoFactorByToken = async (token: string) => {
  try {
    await db.twoFactorToken.findUnique({
      where: {
        token,
      },
    });
  } catch (err) {
    errorHandler(err, "Failed to get two factor by token");
  }
};
export const getTwoFactorByEmail = async (email: string) => {
  try {
    return await db.twoFactorToken.findFirst({
      where: {
        email,
      },
    });
  } catch (err) {
    errorHandler(err, "Failed to get two factor by email");
  }
};

export const getTwoFactorByUserId = async (userId: string) => {
  try {
    return await db.twoFactor.findUnique({
      where: {
        userId,
      },
    });
  } catch (err) {
    return;
  }
};
