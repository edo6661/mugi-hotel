import { db } from "@/lib/db";
import { errorHandler } from "@/utils";

export const getUserByName = async (name: string) => {
  try {
    return await db.user.findUnique({
      where: {
        name,
      },
    });
  } catch (err) {
    errorHandler(err, "Error getting user by name");
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    return await db.user.findUnique({
      where: {
        email,
      },
    });
  } catch (err) {
    errorHandler(err, "Error getting user by email");
  }
};

export const getUserById = async (id: string) => {
  try {
    return await db.user.findUnique({
      where: {
        id,
      },
    });
  } catch (err) {
    errorHandler(err, "Error getting user by id");
  }
};
