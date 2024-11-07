"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "@/lib/types";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../assets/images/logo.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { actionLoginUser } from "@/lib/server-actions/auth-actions";
import { Loader2 } from "lucide-react";

const LoginPage = () => {
  const [Loading, setLoading] = useState(false);
  const router = useRouter();
  const [submitError, setSubmitError] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (
    formData
  ) => {
    setLoading(true);
    console.log("Enter");
    const { session } = await actionLoginUser(formData);
    console.log("out");
    if (!session) {
      form.reset();
      setSubmitError("Error Occured while Logging!!");
    } else {
      router.replace("/");
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log(Loading, isLoading);
  }, [Loading, isLoading]);

  return (
    <Form {...form}>
      <form
        onChange={() => {
          if (submitError) setSubmitError("");
        }}
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full sm:justify-center sm:w-[400px] space-y-6 flex flex-col"
      >
        <Link
          href="/"
          className="
          w-full
          flex
          justify-left
          items-center"
        >
          <Image src={Logo} alt="2920wall Logo" width={100} height={100} />
          <span
            className="font-semibold
          dark:text-white text-2xl first-letter:ml-2"
          >
            INHERENT RISK AI
          </span>
        </Link>

        <FormDescription
          className="
        text-foreground/60"
        >
          An all-In-One Risk Analysis Ai platform for banks
        </FormDescription>

        <FormField
          disabled={isLoading}
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          disabled={isLoading}
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {submitError && <FormMessage>{submitError}</FormMessage>}
        <Button
          type="submit"
          className="w-full p-6"
          size="lg"
          disabled={isLoading}
        >
          {!isLoading && !Loading ? (
            "Login"
          ) : (
            <div className="flex text-white flex-1 justify-center items-center h-[300px]">
              <Loader2 className="h-7 w-7 text-white  animate-spin my-4" />
              <p className="text-xs text-white  ">&nbsp; Loading...</p>
            </div>
          )}
        </Button>
        <span className="self-container">
          Dont have an account?{" "}
          <Link href="/signup" className="text-primary">
            Sign Up
          </Link>
        </span>
      </form>
    </Form>
  );
};

export default LoginPage;
