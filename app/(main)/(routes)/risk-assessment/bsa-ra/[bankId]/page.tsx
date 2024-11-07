"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import RiskAssementForm from "./riskAssementForm";
import { useEffect, useState } from "react";
import { getBanksData } from "@/lib/bankData";
import { code, customers } from "@/types";
import { Loader2 } from "lucide-react";
import { getCodesWithId } from "@/lib/supabase/queries";

const page = ({
  params,
}: {
  params: {
    bankId: string;
  };
}) => {
  const [IsMounted, setIsMounted] = useState(false);
  const [codes, setCodes] = useState<code[]>([]);
  const [isfetching, setIsfetching] = useState(true);

  useEffect(() => {
    const fetchCodes = async () => {
      setIsfetching(true);
      const codesData = await getCodesWithId(params.bankId);
      if (codesData) setCodes(codesData);
      setIsfetching(false);
    };
    fetchCodes();
  }, [codes, params.bankId]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!IsMounted) {
    return (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center">
        <Loader2 className="h-7 w-7 text-white animate-spin mr-2" />
        <p className="text-xs text-white dark:text-zinc-400">Loading ...</p>
      </div>
    );
  }

  return (
    <div className="m-4 border-2 w-full  flex flex-col p-2">
      <div className="flex w-full border-b-2 p-4">
        <h1>BSA-RA</h1>
      </div>

      <RiskAssementForm
        data={{ codes: codes }}
        selectedBankID={params.bankId}
      />
    </div>
  );
};

export default page;
