"use client";
import TrainModel from "@/components/train-model";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { getBanksData } from "@/lib/bankData";
import { create_print_out_prompt } from "@/models/prompt_structure";
import { bank } from "@/types";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = ({
  params,
}: {
  params: {
    bankId: string;
  };
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const [isGenerated, setIsGenerated] = useState(false);

  const [banksData, setBanksData] = useState<bank | {}>({});

  const getBankData = async () => {
    setIsProcessing(true);
    setMessage("Loading Banks data...");

    const response = await getBanksData(params.bankId).catch((error) => {
      console.log(error);
    });

    if (response) {

      setBanksData(response);
      setMessage("Loaded Successfully !!");
    }
    console.log(response);
    setIsProcessing(false);
  };

  const generateReport = async () => {
    setIsProcessing(true);
    setMessage("📂Analysing For Printout...");
    setTimeout(() => {
      setMessage("📂Generating PrintOut...");
    }, 40000);
    const bank = banksData as bank;
    const bankName = (banksData as bank)?.name;
    let codeAnalysisData = "";
    for (const codeAnalysis of bank.codeAnalyses) {
      codeAnalysisData += `analysis of Code : ${codeAnalysis.code
        } :  ${codeAnalysis.comments.replaceAll("\n", "")}`;
    }

    const res = await axios.post("/api/ai/interface_printout", {
      prompt: create_print_out_prompt(codeAnalysisData, bankName),
      bankName: bankName,
    });
    setMessage("✅Printout Generated...");

    const data = await res.data;
    if (data) {
      setIsProcessing(false);
      toast({
        title: "Print Out is Ready",
        description: `Printout is Successfully Generated.`,
      });
      setIsGenerated(true);
    }
    console.log(data);
  };

  useEffect(() => {
    if (params.bankId) {
      getBankData();
    }
  }, [params.bankId]);

  return (
    <div className="flex items-center flex-col justify-center w-full ">
      {isProcessing && (
        <div className="z-10 fixed top-1/2 left-1/2 transform h-full w-full -translate-x-1/2 bg-opacity-80 bg-black text-2xl font-semibold   -translate-y-1/2 flex items-center justify-center">
          <Loader2 className="h-[50px] w-[50px] text-white animate-spin mr-2" />
          <p className="text-[50px] text-white dark:text-zinc-400">{message}</p>
        </div>
      )}
      <div className="flex flex-col border-2 shadow-xl shadow-purple-200 w-1/2 mt-[200px] rounded-[10px] p-4 justify-center items-center">
        <div className="flex w-full items-center justify-center text-2xl font-semibold">
          Generate Analysis Report
        </div>
        <Button
          type="button"
          className="mt-10 w-1/2 hover:bg-purple-300 hover:text-black"
          onClick={() => generateReport()}
        >
          PrintOut
        </Button>

        {isGenerated && (
          <Button
            type="button"
            className="mb-12 mt-3 w-1/2 hover:bg-purple-300 hover:text-black"
          >
            <Link
              href={`/files/${(banksData as bank)?.name?.replaceAll(
                " ",
                ""
              )}_PrintOut.pdf`}
              locale={false}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default page;
