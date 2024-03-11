import FormError from "@/components/general/FormError";
import FormSuccess from "@/components/general/FormSuccess";
import useIsClient from "@/hooks/useIsClient";
import { getCurrentUser } from "@/lib/auth";
import React from "react";

const AdminPage = async () => {
  const session = await getCurrentUser();
  return (
    <div>
      <h1>AdminPage</h1>
      {session?.role === "User" && <FormError error="Do not have permission" />}
      {session?.role === "Admin" && (
        <FormSuccess success="You have a permission" />
      )}
    </div>
  );
};

export default AdminPage;
