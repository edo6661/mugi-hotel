"use client";
import { Button } from "@/components/ui/button";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  defaultValuesLogin,
  loginSchema,
  LoginSchemaType,
} from "@/lib/zod/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/general/FormInput";
import { Form } from "@/components/ui/form";
import FormError from "@/components/general/FormError";
import FormSuccess from "@/components/general/FormSuccess";
import { login } from "@/actions/auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
const LoginForm = () => {
  const router = useRouter();
  const [response, setResponse] = useState({ error: "", success: "" });
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isPending, startTransition] = useTransition();
  const form = useForm<LoginSchemaType>({
    defaultValues: {
      ...defaultValuesLogin,
    },
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });
  const { handleSubmit, control, formState: error, reset } = form;

  const onLogin = (data: LoginSchemaType) => {
    setResponse({ error: "", success: "" });
    startTransition(() => {
      login(data)
        .then((res) => {
          if (res?.error) {
            return setResponse({ error: res?.error, success: "" });
          }
          if (res?.success) {
            return setResponse({ error: "", success: res?.success });
          }
          if (res?.twoFactor) {
            setShowTwoFactor(true);
          }
          router.push(DEFAULT_LOGIN_REDIRECT);
        })
        .catch((err) => {
          setResponse({ error: err.message, success: "" });
          console.error(err);
        });
    });
  };
  const onLoginWithOauth = (provider: "google" | "github") => {
    signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
  };

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={handleSubmit(onLogin)}>
        <h3 className="text-2xl font-bold">Login</h3>
        <div className=" max-w-xl mx-auto space-y-4">
          {!showTwoFactor && (
            <>
              <FormInput
                name="email"
                control={control}
                label="Email"
                placeholder="Email"
                description="This is your email."
                error={error.errors.email}
              />
              <FormInput
                name="password"
                control={control}
                label="Password"
                placeholder="*******"
                type="password"
                description="This is your password."
                error={error.errors.password}
              />

              <div className="fl-itc gap-2">
                <Button
                  disabled={isPending}
                  type="button"
                  variant="secondary"
                  onClick={() => onLoginWithOauth("google")}
                >
                  <FaGoogle color="red" />
                </Button>
                <Button
                  disabled={isPending}
                  type="button"
                  variant="secondary"
                  onClick={() => onLoginWithOauth("github")}
                >
                  <FaGithub color="green" />
                </Button>
                <Button size="sm" asChild>
                  <Link href="/auth/reset">Forgot Password?</Link>
                </Button>
              </div>
            </>
          )}

          <AnimatePresence>
            {showTwoFactor && (
              <FormInput
                name="code"
                control={control}
                label="Code"
                placeholder="123456"
                description="This is your two factor code."
                error={error.errors.code}
              />
            )}
          </AnimatePresence>
          <FormError error={response.error} />
          <FormSuccess success={response.success} />
          <Button disabled={isPending} type="submit">
            {showTwoFactor ? "Verify" : "Login"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
