import { db } from "@/lib/db";
import { errorHandler } from "@/utils";

export const getPasswordResetByToken = async (token: string) => {
  try {
    return await db.passwordResetToken.findUnique({
      where: {
        token,
      },
    });
  } catch (err) {
    errorHandler(err, "Failed to get password reset by token");
  }
};
export const getPasswordResetByEmail = async (email: string) => {
  try {
    return await db.passwordResetToken.findFirst({
      where: {
        email,
      },
    });
  } catch (err) {
    errorHandler(err, "Failed to get password reset by email");
  }
};
