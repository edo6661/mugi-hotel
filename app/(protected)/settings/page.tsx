import { signOut, useSession } from "next-auth/react";
import FormLogout from "../_components/FormLogout";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import Link from "next/link";
import FormLogoutServer from "../_components/FormLogoutServer";
import { getCurrentUser } from "@/lib/auth";
const SettingsPage = async () => {
  // ! kalo pengen dapetin user credentials client
  const session = await getCurrentUser();
  const onLogout = () => {
    signOut();
  };
  return (
    <section>
      <article className=" container px-4">
        <h1>{JSON.stringify(session)}</h1>
        <FormLogoutServer />
        <Link href="/settings/server">Server</Link>
        <Link href="/settings/client">Client</Link>
        <Link href="/settings/admin">Admin</Link>
      </article>
    </section>
  );
};

export default SettingsPage;
