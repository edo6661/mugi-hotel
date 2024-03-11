"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  defaultValuesRegister,
  registerSchema,
  RegisterSchemaType,
} from "@/lib/zod/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/general/FormInput";
import { Form } from "@/components/ui/form";
import { motion } from "framer-motion";
import { register } from "@/actions/auth";
import FormError from "@/components/general/FormError";
import FormSuccess from "@/components/general/FormSuccess";
const RegisterForm = () => {
  const [response, setResponse] = useState({ error: "", success: "" });
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    defaultValues: {
      ...defaultValuesRegister,
    },
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });
  const { handleSubmit, control, formState: error, reset } = form;

  const onRegister = (data: RegisterSchemaType) => {
    setResponse({ error: "", success: "" });
    startTransition(() => {
      register(data).then((res) => {
        if (res.error) {
          return setResponse({ error: res.error, success: "" });
        }
        setResponse({ error: "", success: res.success! });
        reset();
      });
    });
  };

  return (
    <Form {...form}>
      <motion.form
        layout
        className="space-y-8"
        onSubmit={handleSubmit(onRegister)}
      >
        <h3 className="text-2xl font-bold">Register</h3>
        <div className=" max-w-xl mx-auto space-y-4">
          <FormInput
            name="name"
            control={control}
            label="name"
            placeholder="name"
            description="This is your name."
            error={error.errors.name}
          />
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
            placeholder="Password"
            type="password"
            description="This is your password."
            error={error.errors.password}
          />
          <FormError error={response.error} />
          <FormSuccess success={response.success} />
          <Button disabled={isPending}>Register</Button>
        </div>
      </motion.form>
    </Form>
  );
};

export default RegisterForm;
