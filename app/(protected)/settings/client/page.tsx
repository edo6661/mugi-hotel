"use client";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import Link from "next/link";
import FormLogout from "../../_components/FormLogout";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import FormTwoFactor from "../../_components/FormTwoFactor";
const ClientPage = () => {
  // ! kalo pengen dapetin user credentials client
  const session = useCurrentUser();
  console.log(session);
  return (
    <section>
      <article className=" container px-4">
        <h1>{JSON.stringify(session)}</h1>
        <FormLogout />
        <Link href="/settings/">Server</Link>
        <Link href="/settings/client">Client</Link>

        <p>TwoFactor</p>

        <FormTwoFactor {...session} />
      </article>
    </section>
  );
};

export default ClientPage;
