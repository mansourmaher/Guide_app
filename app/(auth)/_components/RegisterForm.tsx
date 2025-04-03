"use client";
import Link from "next/link";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { RegisterSchema } from "@/schemas";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SlimLayout } from "./SlimLayout";
import { Logo } from "./Logo";
import { FormSucces } from "./Form-succes";
import { FormError } from "./Form-error";
import axios, { AxiosError } from "axios";
import { Loader } from "lucide-react";

interface AxiosSignInResponse {
  status: number;
}

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isLoading, setIsloading] = useState(false);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      role: "GUIDE",
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    setIsloading(true);
    try {
      console.log(values);
      const response = await axios.post<AxiosSignInResponse>(
        "http://localhost:4000/auth/register",
        values
      );
      console.log(response);
      if (response.status === 200) {
        setSuccess("Account created successfully");
        setIsloading(false);
      }
    } catch (error: any) {
      console.log(error);
      setIsloading(false);
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 500) {
        setError("An error occurred");
      } else if (axiosError.response?.status === 400) {
        setError("An Error occurred");
      } else if (axiosError.response?.status === 409) {
        setError("Email already exists");
      }
    }
  };

  return (
    <SlimLayout>
      <div className="flex">
        <Link href="/" aria-label="Home">
          <Logo className="h-10 w-auto" />
        </Link>
      </div>
      <h2 className="mt-20 text-lg font-semibold text-gray-900">
        Get started for free
      </h2>
      <p className="mt-2 text-sm text-gray-700">
        Already registered?{" "}
        <Link
          href="/login"
          className="font-medium text-blue-600 hover:underline"
        >
          Sign in
        </Link>{" "}
        to your account.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel htmlFor="email">Email address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="col-span-full"
                    type="email"
                    required
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.email?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="first name">First name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    name="first_name"
                    type="text"
                    autoComplete="given-name"
                    required
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.fullName?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="lastname">Phone number</FormLabel>
                <FormControl>
                  <Input {...field} type="text" required />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.phoneNumber?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="col-span-full"
                    type="password"
                    required
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.password?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          {error ||
            (success && (
              <div className="col-span-full my-4">
                <FormSucces message={success} />
                <FormError message={error} />
              </div>
            ))}

          <div className="col-span-full">
            <Button
              type="submit"
              className="w-full cursor-pointer"
              variant="primary"
              disabled={isPending}
            >
              {isLoading ? (
                <Loader className="animate-spin" />
              ) : (
                <span>
                  Sign up <span aria-hidden="true">&rarr;</span>
                </span>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </SlimLayout>
  );
};
