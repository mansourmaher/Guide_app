"use client";
import Link from "next/link";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
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
import axios, { type AxiosError } from "axios";
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
          {error && (
            <div className="col-span-full my-4 rounded-lg border border-red-100 bg-red-50 p-4 shadow-sm dark:border-red-900/30 dark:bg-red-900/20">
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 dark:bg-red-800/60">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-600 dark:text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1.293-11.293a1 1 0 00-1.414 0L7.586 9.586a1 1 0 001.414 1.414L10 9.414l2.293 2.293a1 1 0 001.414-1.414l-2.293-2.293zM10 14a1.5 1.5 0 110-3h3a1.5 1.5 0 110 3H10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium text-red-800 dark:text-red-300">
                  {error}
                </p>
              </div>
            </div>
          )}
          {success && (
            <div className="col-span-full my-4 rounded-lg border border-green-100 bg-green-50 p-4 shadow-sm dark:border-green-900/30 dark:bg-green-900/20">
              <div className="flex flex-col space-y-3">
                <div className="flex items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-800/60">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-600 dark:text-green-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="ml-3 text-lg font-medium text-green-800 dark:text-green-300">
                    Welcome to our travel community!
                  </h3>
                </div>

                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Your free 30-day subscription is now active. Explore
                  destinations, find local guides, and plan your perfect trip.
                </p>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                  After 30 days, you'll need to subscribe to one of our plans to
                  maintain access to all features.
                </p>
              </div>
            </div>
          )}

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
