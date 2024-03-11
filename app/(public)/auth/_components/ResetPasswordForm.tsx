"use client";
import { Button } from "@/components/ui/button";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  defaultValuesReset,
  resetSchema,
  ResetSchemaType,
} from "@/lib/zod/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/general/FormInput";
import { Form } from "@/components/ui/form";
import FormError from "@/components/general/FormError";
import FormSuccess from "@/components/general/FormSuccess";
import { resetPassword } from "@/actions/auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import Link from "next/link";
const ResetPasswordForm = () => {
  const router = useRouter();
  const [response, setResponse] = useState({ error: "", success: "" });
  const [isPending, startTransition] = useTransition();
  const form = useForm<ResetSchemaType>({
    defaultValues: {
      ...defaultValuesReset,
    },
    resolver: zodResolver(resetSchema),
    mode: "onChange",
  });
  const { handleSubmit, control, formState: error, reset } = form;

  const onReset = (data: ResetSchemaType) => {
    setResponse({ error: "", success: "" });
    startTransition(() => {
      resetPassword(data).then((res) => {
        if (res?.error) {
          return setResponse({ error: res?.error, success: "" });
        }
        setResponse({ error: "", success: res?.success! });
        reset();
      });
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={handleSubmit(onReset)}>
        <h3 className="text-2xl font-bold">Reset Password</h3>
        <div className=" max-w-xl mx-auto space-y-4">
          <FormInput
            name="email"
            control={control}
            label="Email"
            placeholder="Email"
            description="This is your email."
            error={error.errors.email}
          />

          <FormError error={response.error} />
          <FormSuccess success={response.success} />

          <div className="fl-itc gap-2">
            <Button disabled={isPending} type="submit">
              Reset Password
            </Button>

            <Button size="sm" asChild>
              <Link href="/auth/">Back to login</Link>
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
