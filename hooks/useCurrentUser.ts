import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
  // ! kalo pengen dapetin user credentials client

  const session = useSession();
  return session.data?.user;
};
