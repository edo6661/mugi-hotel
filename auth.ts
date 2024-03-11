import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getUserById } from "./services/user";
import { Role } from "@prisma/client";
import { getTwoFactorByUserId } from "./services/twofactor";
import "next-auth/jwt";
import { getAccountByUserId } from "./services/account";

declare module "next-auth" {
  interface User {
    role: Role;
    isTwoFactorEnabled: boolean;
    isOauth: boolean;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    role?: Role;
    isTwoFactorEnabled: boolean;
    isOauth: boolean;
  }
}

export const {
  handlers: { GET, POST },
  // ! auth untuk mengakses current user / session
  auth,
  signIn,
  signOut,
  unstable_update,
} = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  // ! gabisa make strategy database karena pake prisma dan prisma ga support edge runtime
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account, profile, trigger, session }) {
      if (!token.sub) return token;

      const userExist = await getUserById(token.sub);
      if (!userExist) return token;

      const accountExist = await getAccountByUserId(userExist.id);

      // ! ngasih role ke token sesuai role user yang login
      token.name = userExist.name;
      token.email = userExist.email;
      token.role = userExist.role;
      token.isTwoFactorEnabled = userExist.isTwoFactorEnabled;
      token.isOauth = !!accountExist;

      return token;
    },
    async session({ token, session, user, newSession, trigger }) {
      // ! token.sub = subject (id user), ngirim id ke session
      // ! ngambil id nya dari token.sub dan masukin ke session.user.id agar bisa diakses di client,
      if (token.sub && session.user) session.user.id = token.sub;

      if (token.role && session.user) session.user.role = token.role;

      if (token.name && session.user) session.user.name = token.name;

      if (token.email && session.user) session.user.email = token.email;

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled;
        session.user.isOauth = token.isOauth;
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
