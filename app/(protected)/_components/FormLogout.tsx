import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import React from "react";

const FormLogout = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/auth" });
      }}
    >
      <Button variant="destructive">Logout</Button>
    </form>
  );
};

export default FormLogout;
