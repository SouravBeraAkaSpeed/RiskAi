"use client";
import { signOut } from "@/lib/server-actions/auth-actions";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";

const SignOut = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    const response = await signOut();
    console.log(response);
    if (response === null) {
      toast({
        title: "Signed Out",
        description: "Your are successfully Signed out",
      });
      router.push("/login");
    }
  };
  return <Button onClick={handleSignOut}>Logout</Button>;
};

export default SignOut;
