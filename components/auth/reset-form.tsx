"use client";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import { ResetProps, ResetSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { reset } from "@/actions/reset";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { ToastAction } from "@/components/ui/toast";

export const ResetForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  const form = useForm<ResetProps>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: ResetProps) => {
    try {
      setError("");
      setSuccess("");

      // console.log(values);

      startTransition(() => {
        reset(values).then((data: any) => {
          setError(data?.error);
          // todo : add when we add 2FA
          setSuccess(data?.success);

          if (data.success) {
            form.reset();
            toast({ description: "User successfully logged in" });
          } else {
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: error,
              action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CardWrapper
      headerLabel="Forgot your password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Email"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />

          <Button type="submit" disabled={isPending} className="w-full">
            Send reset email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
