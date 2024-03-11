import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getUserById } from "./services/user";
import { Role } from "@prisma/client";
import { getTwoFactorByUserId } from "./services/twofactor";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    role: Role;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    role?: Role;
  }
}

export const {
  handlers: { GET, POST },
  // ! auth untuk mengakses current user / session
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  // ! gabisa make strategy database karena pake prisma dan prisma ga support edge runtime
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (!token.sub) return token;

      const userExist = await getUserById(token.sub);
      if (!userExist) return token;

      // ! ngasih role ke token sesuai role user yang login
      token.role = userExist.role;

      return token;
    },
    async session({ token, session, user }) {
      // ! token.sub = subject (id user), ngirim id ke session
      // ! ngambil id nya dari token.sub dan masukin ke session.user.id agar bisa diakses di client,
      if (token.sub && session.user && token.role) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }

      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const userExist = await getUserById(user.id!);
      if (!userExist?.emailVerified) return false;

      if (userExist.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorByUserId(user.id!);
        if (!twoFactorConfirmation) return false;

        await db.twoFactor.delete({
          where: {
            id: twoFactorConfirmation.id,
          },
        });
      }

      return true;
    },
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
});
