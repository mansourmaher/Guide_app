"use client";
import { type Metadata } from "next";
import Link from "next/link";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";
import { useCookies } from "next-client-cookies";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/schemas";
import { SlimLayout } from "./SlimLayout";
import { Logo } from "./Logo";
import { FormError } from "./Form-error";
import { FormSucces } from "./Form-succes";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

interface AxiosSignInResponse {
  _id: string;
  email: string;
  access_token: string;
  tokenType: string;
  roles: string[];
  verified: boolean;
  accountSettet: boolean;
}

function LoginForm() {
  const cookies = useCookies();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [succes, setSucces] = useState<string | undefined>("");
  const [isLoading, setIsloading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError(undefined);
    setSucces(undefined);
    setIsloading(true);
    try {
      console.log(values);
      const response = await axios.post<AxiosSignInResponse>(
        "http://localhost:4000/auth/signin",
        values
      );

      // const fetchIfTheTeacherIsActivated = async (): Promise<boolean> => {
      //   const res = await axios.get(
      //     `http://localhost:8080/api/auth/user/${response.data.email}`,
      //   );
      //   if (
      //     res.data.verified === false &&
      //     response.data.roles.includes(ERole.ROLE_TEACHER)
      //   ) {
      //     setError("لم يتم تفعيل حسابك بعد");
      //     console.log("Teacher is not activated");
      //     return false;
      //   }
      //   return true;
      // };

      // const isActivated = await fetchIfTheTeacherIsActivated();
      // if (!isActivated) return;

      // if (response.data.roles.includes(ERole.ROLE_PARENT)) {
      //   cookies.set("accessToken", response.data.accessToken, { secure: true });
      //   cookies.set("email", response.data.email, { secure: true });
      //   router.push("/auth/profile");
      // } else if (response.data.roles.includes(ERole.ROLE_TEACHER)) {
      //   cookies.set("accessToken", response.data.accessToken, { secure: true });
      //   cookies.set("email", response.data.email, { secure: true });
      //   cookies.set("teacherId", response.data.id.toString(), { secure: true });
      //   router.push("/teacher/courses");
      // }
      // console.log(response);
      if (response.status === 200) {
        setIsloading(false);
        console.log("You are logged in");
        console.log(response.data);
        setSucces("You are logged in");
        cookies.set("accessToken", response.data.access_token, {
          secure: true,
        });

        cookies.set("id", response.data._id, { secure: true });
        // @ts-ignore
        if (response.data.role === "ADMIN") {
          router.push("/admin/dashboard");
          return;
        }
        if (response.data.accountSettet) {
          router.push("/guide/dashboard");
        } else {
          router.push("/setup-account");
        }
      }
    } catch (error: any) {
      setIsloading(false);
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 401) {
        setError("Veuillez vérifier votre compte");
      }
      if (axiosError.response?.status === 404) {
        setError("User not found");
      }
    }
  };
  return (
    <SlimLayout>
      <div className="flex ">
        <Link href="/" aria-label="Home">
          <Logo className="h-10 w-auto" />
        </Link>
      </div>
      <h2 className="mt-20 text-lg font-semibold text-gray-900">
        Sign in to your account
      </h2>
      <p className="mt-2 text-sm text-gray-700">
        Don’t have an account?{" "}
        <Link
          href="/sign-up"
          className="font-medium text-blue-600 hover:underline"
        >
          Sign up
        </Link>{" "}
        for a free trial.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-10 grid grid-cols-1 gap-y-8"
          aria-disabled={isPending}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    required
                    type="email"
                    autoComplete="email"
                    placeholder="Email address"
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    required
                    type="password"
                    placeholder="Password"
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.password?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormError message={error} />
          <FormSucces message={succes} />
          <div>
            <Button
              type="submit"
              color="blue"
              className="w-full"
              variant="primary"
              disabled={isPending}
              onClick={() => form.handleSubmit(onSubmit)}
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
}

export default LoginForm;
