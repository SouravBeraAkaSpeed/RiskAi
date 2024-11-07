"use client";
import BankSetup from "@/components/bank-setup/bank-setup";
import { useSupabaseUser } from "@/components/providers/supabase-user-provider";
import { getBank } from "@/lib/supabase/queries";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { state } = useSupabaseUser();
  const [bank, setBank] = useState<{
    id: string;
    name: string;
    address: string;
    createdAt: Date;
    updatedAt: Date | null;
    status: string | null;
  } | null>(null);

  useEffect(() => {
    const bankDetail = async () => {
      const bankdata = await getBank(state.user?.email!!);
      if (bankdata) {
        setBank(bankdata);
        if (bankdata.status === "files_uploaded")
          router.push(`/dashboard/?${bankdata.id}`);
      }
      setIsLoading(false);
    };
    if (state.user) {
      bankDetail();
    }
  }, [state.user]);

  console.log("user:", state.user);
  if (isLoading) {
    return (
      <div className="flex text-white flex-1 justify-center items-center h-[300px]">
        <Loader2 className="h-7 w-7 text-white  animate-spin my-4" />
        <p className="text-xs text-white  ">&nbsp; Loading...</p>
      </div>
    );
  }

  return (
    <div
      className="bg-background
          h-screen
          w-screen
          flex
          flex-col
          justify-center
          items-center
          gap-y-10
          "
    >
      <div className="flex flex-col items-center">
        <div className="text-3xl font-bold">OnBoarding</div>
        <div className="text-lg">
          The process of onboarding can take some mins{" "}
        </div>
      </div>
      <BankSetup bank={bank} />
      <div className="flex flex-col items-center">
        <div className="text-lg">
          *You will be notified by email when the onboarding process is
          completed{" "}
        </div>
      </div>
    </div>
  );
};

export default Page;
