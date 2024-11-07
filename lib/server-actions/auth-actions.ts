"use server";

import { z } from "zod";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { FormSchema } from "../types";
import { cookies } from "next/headers";

export async function actionLoginUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  cookies().getAll();
  console.log("enter");
  const supabase = createRouteHandlerClient({ cookies });
  console.log("entered");
  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  console.log("exit");
  const data = await response.data;
  console.log("response:", data);
  return data;
}

export async function actionSignUpUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data } = await supabase.from("users").select("*").eq("email", email);
  console.log("data: ",data)
  if (data?.length) return { error: "User already exists" };
  const response = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `http://localhost:3000/api/auth/callback`,
    },
  });
  console.log(response);
  if (!response.error) return { message: "success" };
  else
    return {
      error: "Confirmation Email send limit excedded",
    };
}

export async function signOut() {
  const supabase = createRouteHandlerClient({ cookies });
  const { error } = await supabase.auth.signOut();
  return error ? { success: true } : null;
}
