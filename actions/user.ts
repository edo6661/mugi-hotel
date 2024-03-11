"use server";

import { unstable_update } from "@/auth";
import { db } from "@/lib/db";
import { errorHandler } from "@/utils";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateUser = async (
  data: Pick<User, "id" | "isTwoFactorEnabled">
) => {
  try {
    unstable_update({
      user: {
        isTwoFactorEnabled: data.isTwoFactorEnabled,
      },
    });
    revalidatePath("/settings");
    return await db.user.update({
      where: {
        id: data.id!,
      },
      data: {
        ...data,
      },
    });
  } catch (err) {
    errorHandler(err, "Failed to update user!");
  }
};
