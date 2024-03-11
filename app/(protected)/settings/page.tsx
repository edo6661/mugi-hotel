"use client";
import { signOut, useSession } from "next-auth/react";
import FormLogout from "../_components/FormLogout";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/useCurrentUser";
const SettingsPage = () => {
  // ! kalo pengen dapetin user credentials client

  const session = useCurrentUser();
  console.log(session);
  const onLogout = () => {
    logout();
  };
  return (
    <section>
      <article className=" container px-4">
        <h1>{JSON.stringify(session)}</h1>
        {/* <FormLogout /> */}
        <Button onClick={onLogout}>Signout</Button>
      </article>
    </section>
  );
};

export default SettingsPage;
