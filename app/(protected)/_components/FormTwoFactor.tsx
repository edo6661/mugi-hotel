"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState, useTransition } from "react";
import { updateUser } from "@/actions/user";
import { User } from "next-auth";
import { useSession } from "next-auth/react";

// TODO clean up component

const FormSchema = z.object({
  isTwoFactorEnabled: z.boolean().default(false),
  id: z.string(),
});

export default function FormTwoFactor({
  id,
  isTwoFactorEnabled,
}: Partial<User>) {
  const [isPending, startTransition] = useTransition();
  const [isChanged, setIsChanged] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: id,
      isTwoFactorEnabled,
    },
  });
  const { update } = useSession();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      await updateUser(data)
        .then(() => {
          update();
          toast({
            title: "Successfully updated",
            description: "Two Factor settings updated",
          });
        })
        .catch((err) => {
          toast({
            title: "Failed to update",
            description: err.message,
          });
          console.error(err);
        });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div>
          <h3 className="mb-4 text-lg font-medium">Email Notifications</h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="isTwoFactorEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Two Factor</FormLabel>
                    <FormDescription>
                      Receive notifications when someone logs into your account
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(value) => {
                        field.onChange(value);
                        setIsChanged(value !== isTwoFactorEnabled);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        {isChanged && (
          <Button type="submit" disabled={isPending}>
            Submit
          </Button>
        )}
      </form>
    </Form>
  );
}
