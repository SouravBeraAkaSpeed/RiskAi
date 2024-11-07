"use client";

import TrainModel from "@/components/train-model";
import { getAnalysis } from "@/lib/server-actions/ai-actions";
import { getBankWithId } from "@/lib/supabase/queries";
import { Loader2 } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = ({
  params,
}: {
  params: {
    bankId: string;
  };
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const fetchBankStatus = async () => {
      const bank = await getBankWithId(params.bankId);
      console.log(bank?.status);
      if (bank?.status !== "files_uploaded") return router.push(`/onboarding`);
      setIsLoading(false);
      // await getAnalysis(params.bankId, {
      //   code: "NRA",
      //   riskCategory: "NRA Customers",
      //   lowRisk: "The institution does not have any NRA accounts.",
      //   moderateRisk:
      //     "Moderate level of NRA accounts from lower- risk geographies.",
      //   highRisk:
      //     "Significant number of NRA accounts from higher-risk geographies.",
      // });
    };
    fetchBankStatus();
  }, []);

  if (isLoading)
    return (
      <div className="flex text-white flex-1 justify-center items-center h-[300px]">
        <Loader2 className="h-7 w-7 text-white  animate-spin my-4" />
        <p className="text-xs text-white  ">&nbsp; Loading...</p>
      </div>
    );
  return <TrainModel />;
};

export default Page;
