"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  defaultValuesNewPassword,
  newPasswordSchema,
  NewPasswordSchemaType,
  resetSchema,
  ResetSchemaType,
} from "@/lib/zod/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/general/FormInput";
import { Form } from "@/components/ui/form";
import FormError from "@/components/general/FormError";
import FormSuccess from "@/components/general/FormSuccess";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { newPassword } from "@/actions/auth";
import { set } from "zod";
const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const [response, setResponse] = useState({ error: "", success: "" });
  const [isPending, startTransition] = useTransition();
  const form = useForm<NewPasswordSchemaType>({
    defaultValues: {
      ...defaultValuesNewPassword,
    },
    resolver: zodResolver(newPasswordSchema),
    mode: "onChange",
  });
  const { handleSubmit, control, formState: error, reset } = form;

  const onReset = (data: NewPasswordSchemaType) => {
    setResponse({ error: "", success: "" });
    startTransition(() => {
      newPassword(data, token!).then((res) => {
        if (res?.error) {
          return setResponse({ error: res?.error, success: "" });
        }
        setResponse({ error: "", success: res?.success! });
        reset();
        router.push("/auth");
      });
    });
  };

  useEffect(() => {
    if (!token) setResponse({ error: "Token does'nt exist!", success: "" });
  }, [token]);

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={handleSubmit(onReset)}>
        <h3 className="text-2xl font-bold">Reset Password</h3>
        <div className=" max-w-xl mx-auto space-y-4">
          <FormInput
            name="password"
            control={control}
            label="Password"
            placeholder="******"
            description="This is your password."
            error={error.errors.password}
            type="password"
          />

          <FormError error={response.error} />
          <FormSuccess success={response.success} />

          <div className="fl-itc gap-2">
            <Button disabled={isPending} type="submit">
              New Password
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default NewPasswordForm;
