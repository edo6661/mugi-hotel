"use client";

import { newVerification } from "@/actions/verification";
import FormError from "@/components/general/FormError";
import FormSuccess from "@/components/general/FormSuccess";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const NewVerification = () => {
  const [response, setResponse] = useState({
    error: "",
    success: "",
  });
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (response.error || response.success) return;
    if (!token) return setResponse({ error: "Token not found", success: "" });
    newVerification(token)
      .then((res) => {
        setResponse({ error: res.error!, success: res.success! });
      })
      .catch((err) => {
        setResponse({ error: "Something went wrong", success: "" });
        console.error(err);
      });
  }, [token, response]);

  useEffect(() => {
    if (token) onSubmit();
  }, [onSubmit, token]);

  return (
    <div>
      {!response.error && !response.success && <p>Verifying...</p>}
      {!response.success && response.error && (
        <FormError error={response.error} />
      )}
      {!response.error && response.success && (
        <FormSuccess success={response.success} />
      )}
      <Link href="/auth/">Back to Login</Link>
    </div>
  );
};

export default NewVerification;
