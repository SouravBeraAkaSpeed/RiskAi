"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { assesment, bank, code, codeAnalyses, codes, subcode } from "@/types";
import axios from "axios";
import { ArrowUpDown, Cone, Loader2, Router } from "lucide-react";
import queryString from "query-string";
import {
  cbCode,
  nraCode,
  table_content,
  table_header,
} from "@/constant/riskAssesmentTableData";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { getBanksData } from "@/lib/bankData";
import { getCodesWithId } from "@/lib/supabase/queries";
import { getAnalysis } from "@/lib/server-actions/ai-actions";
import { addCodeAnalysis } from "@/lib/addCodeAnalysisToDB";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  CB: z.boolean().default(false).optional(),
  NRA: z.boolean().default(false).optional(),
  IA: z.boolean().default(false).optional(),
  EM: z.boolean().default(false).optional(),
  MSB: z.boolean().default(false).optional(),
  TP: z.boolean().default(false).optional(),
  IG: z.boolean().default(false).optional(),
  HR: z.boolean().default(false).optional(),
  HRL: z.boolean().default(false).optional(),
  EB: z.boolean().default(false).optional(),
  SV: z.boolean().default(false).optional(),
  CI: z.boolean().default(false).optional(),
  CTR: z.boolean().default(false).optional(),
  LC: z.boolean().default(false).optional(),
  CO: z.boolean().default(false).optional(),
  FC: z.boolean().default(false).optional(),
  FBAR: z.boolean().default(false).optional(),
  P: z.boolean().default(false).optional(),
  PB: z.boolean().default(false).optional(),
  ND: z.boolean().default(false).optional(),
  FT: z.boolean().default(false).optional(),
  CBW: z.boolean().default(false).optional(),
  ACH: z.boolean().default(false).optional(),
  MI: z.boolean().default(false).optional(),
  LOC_C: z.boolean().default(false).optional(),
  NP: z.boolean().default(false).optional(),
  S: z.boolean().default(false).optional(),
  SAR: z.boolean().default(false).optional(),
});

const code_names = [
  "CB",
  "NRA",
  "IA",
  "EM",
  "MSB",
  "TP",
  "IG",
  "HR",
  "HRL",
  "EB",
  "SV",
  "CI",
  "CTR",
  "LC",
  "CO",
  "FC",
  "FBAR",
  "P",
  "PB",
  "ND",
  "FT",
  "CBW",
  "ACH",
  "MI",
  "LOC_C",
  "NP",
  "S",
  "SAR",
];

const RiskAssementForm = ({
  data,
  selectedBankID: bankId,
}: {
  data: {
    codes: {
      code: string;
      riskCategory: string;
      lowRisk: string;
      moderateRisk: string;
      highRisk: string;
      subcode?: [subcode];
    }[];
  };
  selectedBankID: string;
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [lowRiskSub, setLowRiskSub] = useState<string>("");
  const [moderateRiskSub, setModerateRiskSub] = useState<string>("");
  const [highRiskSub, setHighRiskSub] = useState<string>("");

  const [banksData, setBanksData] = useState<bank | {}>({});
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      CB: false,
      NRA: false,
      IA: false,
      EM: false,
      MSB: false,
      TP: false,
      IG: false,
      HR: false,
      HRL: false,
      EB: false,
      SV: false,
      CI: false,
      CTR: false,
      LC: false,
      CO: false,
      FC: false,
      FBAR: false,
      P: false,
      PB: false,
      ND: false,
      FT: false,
      CBW: false,
      ACH: false,
      MI: false,
      LOC_C: false,
      NP: false,
      S: false,
      SAR: false,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsProcessing(true);
    setMessage("Parsing Data...");

    data = {
      codes: [],
    };

    for (const [key, value] of Object.entries(values)) {
      if (value) {
        const filteredCodes = (banksData as bank)?.codes.filter(
          (code) => key === code.code
        );
        data["codes"].push(filteredCodes[0]);
      }
    }

    console.log("passed values:", data);

    for (const code of data.codes) {
      setMessage("📂Assessing your data...");
      setTimeout(() => {
        setMessage("🧠Analysing...");
      }, 30000);

      setTimeout(() => {
        setMessage("⌛ReChecking the Analysis...");
      }, 70000);
      getAnalysis(bankId, code).then((res) => {
        console.log(res);
        setMessage(`✅${code.code} code Analysis Complete`);
        if (
          res.inherentRiskScore &&
          res.residualRiskScore &&
          res.mitigatingControlScore
        ) {
          const assessment: assesment = {
            code: code.code,
            comments: res.reasoning ? res.reasoning : "",
            documentUsedForAnalysis: res.documentUsedForAnalysis
              ? res.documentUsedForAnalysis
              : "",
            inherentRiskCategory: res.inherentRiskCategory
              ? res.inherentRiskCategory
              : "",
            inherentRiskScore: res.inherentRiskScore
              ? parseInt(res.inherentRiskScore)
              : 0,
            mitigatingControl: res.mitigatingControl
              ? res.mitigatingControl
              : "",
            mitigatingControlScore: res.mitigatingControlScore
              ? parseInt(res.mitigatingControlScore)
              : 0,
            residualRiskCategory: res.residualRiskCategory
              ? res.residualRiskCategory
              : "",
            residualRiskScore: res.residualRiskScore
              ? parseInt(res.residualRiskScore)
              : 0,
            bankId: bankId,
          };
          addCodeAnalysis(assessment).then((res) => {
            setMessage("Analysis Saved ☑️...");
            toast({
              title: "Uploaded Code Analysis",
              description: `${code.code} Code Analysis Successfully Done.`,
            });
            setIsProcessing(false);
            getBankData();
          });
        } else {
          toast({
            title: "Nework Error occured during analysis",
            description: `${code.code} Code Analysis Incomplete, Kindly perform the analysis again .`,
          });
        }
      });
    }
    router.refresh();
  };

  const getBankData = async () => {
    setIsProcessing(true);
    setMessage("Loading Banks data...");

    const response = await getBanksData(bankId).catch((error) => {
      console.log(error);
    });

    console.log(response);
    setBanksData(response);
    setMessage("Loaded Successfully !!");

    setIsProcessing(false);
  };
  useEffect(() => {
    if (bankId) {
      getBankData();
    }
  }, [bankId]);

  function handleCheckboxChange(code: string, isChecked: boolean) {
    setSelectedRows((prevSelectedRows) => {
      if (isChecked) {
        return [...prevSelectedRows, code];
      } else {
        return prevSelectedRows.filter((row) => row !== code);
      }
    });
  }

  return (
    <div>
      {(isLoading || isProcessing) && (
        <div className="z-10 fixed top-1/2 left-1/2 transform h-full w-full -translate-x-1/2 bg-opacity-80 bg-black text-2xl font-semibold   -translate-y-1/2 flex items-center justify-center">
          <Loader2 className="h-[50px] w-[50px] text-white animate-spin mr-2" />
          <p className="text-[50px] text-white dark:text-zinc-400">{message}</p>
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="flex flex-col w-full p-4">
            <Table>
              {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
              <TableHeader>
                <TableRow>
                  {table_header.map((header, index) => (
                    <TableHead key={index}>{header}</TableHead>
                  ))}

                  {/* <TableHead className="text-center">Risk SubClasses</TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {(banksData as bank)?.codes?.map((content, index) => (
                  <>
                    <TableRow
                      key={index + content.code}
                      className="border-b-2 "
                    >
                      <TableCell className="align-top ">
                        <FormField
                          control={form.control}
                          name={
                            content.code as
                              | "CB"
                              | "NRA"
                              | "IA"
                              | "EM"
                              | "MSB"
                              | "TP"
                              | "IG"
                              | "HR"
                              | "HRL"
                              | "EB"
                              | "SV"
                              | "CI"
                              | "CTR"
                              | "LC"
                              | "CO"
                              | "FC"
                              | "FBAR"
                              | "P"
                              | "PB"
                              | "ND"
                              | "FT"
                              | "CBW"
                              | "ACH"
                              | "MI"
                              | "LOC_C"
                              | "NP"
                              | "S"
                              | "SAR"
                          }
                          render={({ field }) => (
                            <FormItem className="m-2 text-sm flex items-center justify-center ">
                              <FormControl>
                                <Checkbox
                                  id={`${content.code}`}
                                  className="mt-2"
                                  checked={field.value}
                                  onCheckedChange={(isChecked) => {
                                    field.onChange(isChecked);
                                    handleCheckboxChange(
                                      content.code,
                                      isChecked as boolean
                                    );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="mt-4 mx-3  items-center block w-full justify-center">
                                {content.code}
                              </FormLabel>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TableCell>
                      <TableCell className="align-top">
                        {content.riskCategory}
                      </TableCell>
                      <TableCell className="align-top">
                        {lowRiskSub === content.lowRisk
                          ? content.lowRisk
                          : content.lowRisk.substring(0, 40)}
                        <p
                          className="cursor-pointer text-purple-800"
                          onClick={() => {
                            if (lowRiskSub === content.lowRisk) {
                              setLowRiskSub("");
                            } else {
                              setLowRiskSub(content.lowRisk);
                            }
                          }}
                        >
                          {lowRiskSub === content.lowRisk ? "Less" : "...More"}
                        </p>
                      </TableCell>
                      <TableCell className="align-top">
                        {moderateRiskSub === content.moderateRisk
                          ? content.moderateRisk
                          : content.moderateRisk.substring(0, 40)}
                        <p
                          className="cursor-pointer text-purple-800"
                          onClick={() => {
                            if (moderateRiskSub === content.moderateRisk) {
                              setModerateRiskSub("");
                            } else {
                              setModerateRiskSub(content.moderateRisk);
                            }
                          }}
                        >
                          {moderateRiskSub === content.moderateRisk
                            ? "Less"
                            : "...More"}
                        </p>
                      </TableCell>
                      <TableCell className="align-top">
                        {highRiskSub === content.highRisk
                          ? content.highRisk
                          : content.highRisk.substring(0, 40)}
                        <p
                          className="cursor-pointer text-purple-800"
                          onClick={() => {
                            if (highRiskSub === content.highRisk) {
                              setHighRiskSub("");
                            } else {
                              setHighRiskSub(content.highRisk);
                            }
                          }}
                        >
                          {highRiskSub === content.highRisk
                            ? "Less"
                            : "...More"}
                        </p>
                      </TableCell>

                      <TableCell className="align-top">
                        {
                          (banksData as bank)?.codeAnalyses.filter(
                            (assessment) => assessment.code === content.code
                          )[0]?.inherentRiskCategory
                        }
                      </TableCell>
                      <TableCell className="align-top">
                        {
                          (banksData as bank)?.codeAnalyses.filter(
                            (assessment) => assessment.code === content.code
                          )[0]?.inherentRiskScore
                        }
                      </TableCell>
                      {/* <TableCell className="align-top">
                        {
                          (banksData as bank)?.codeAnalyses.filter(
                            (assessment) => assessment.code === content.code
                          )[0]?.mitigatingControl
                        }
                      </TableCell>
                      <TableCell className="align-top">
                        {
                          (banksData as bank)?.codeAnalyses.filter(
                            (assessment) => assessment.code === content.code
                          )[0]?.mitigatingControlScore
                        }
                      </TableCell>
                      <TableCell className="align-top">
                        {
                          (banksData as bank)?.codeAnalyses.filter(
                            (assessment) => assessment.code === content.code
                          )[0]?.residualRiskScore
                        }
                      </TableCell> */}
                      <TableCell className="align-top">
                        {
                          (banksData as bank)?.codeAnalyses.filter(
                            (assessment) => assessment.code === content.code
                          )[0]?.documentUsedForAnalysis
                        }
                      </TableCell>
                      <TableCell className="align-top w-[600px]">
                        <Textarea
                          rows={6}
                          cols={6}
                          className="w-[300px]"
                          value={
                            (banksData as bank)?.codeAnalyses.filter(
                              (assessment) => assessment.code === content.code
                            )[0]?.comments
                          }
                        />
                      </TableCell>
                      {/* <TableCell>
                      <Table className="h-full overflow-scroll">
                        <TableHeader>
                          <TableRow className="bg-black text-white">
                            <TableHead>#</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Strong(3)</TableHead>
                            <TableHead>Adequate(2)</TableHead>
                            <TableHead>Weak(1)</TableHead>
                            <TableHead>Score</TableHead>
                            <TableHead>Comments</TableHead>
                            <TableHead>Documents</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {content.subclasses?.map((subcode, index) => (
                            <TableRow key={index}>
                              <TableCell className="align-top">
                                {subcode.subcode}
                              </TableCell>
                              <TableCell className="align-top">
                                {subcode.category}
                              </TableCell>
                              <TableCell className="align-top">
                                {subcode.strong}
                              </TableCell>
                              <TableCell className="align-top">
                                {subcode.adequate}
                              </TableCell>
                              <TableCell className="align-top">
                                {subcode.weak}
                              </TableCell>
                              <TableCell className="align-top">
                                {subcode.score}
                              </TableCell>
                              <TableCell className="align-top">
                                {subcode.comments}
                              </TableCell>
                              <TableCell className="align-top">
                                {subcode.documents}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableCell> */}
                    </TableRow>

                    {selectedRows.includes(content.code as never) && (
                      <TableRow
                        key={index + "sub_code"}
                        className="border-b-2 mx-10"
                      >
                        <TableCell colSpan={12} className="p-0">
                          <Table className="h-full overflow-scroll">
                            <TableHeader>
                              <TableRow className="bg-gray-300 text-black ">
                                <TableHead className="text-black">
                                  SubCode
                                </TableHead>
                                <TableHead className="text-black">
                                  Category
                                </TableHead>
                                <TableHead className="text-black">
                                  Strong(3)
                                </TableHead>
                                <TableHead className="text-black">
                                  Adequate(2)
                                </TableHead>
                                <TableHead className="text-black">
                                  Weak(1)
                                </TableHead>
                                <TableHead className="text-black">
                                  Score
                                </TableHead>
                                <TableHead className="text-black">
                                  Mitigating Control
                                </TableHead>
                                <TableHead className="text-black">
                                  Mitigating Control Score
                                </TableHead>
                                <TableHead className="text-black">
                                  Residual Risk
                                </TableHead>
                                <TableHead className="text-black">
                                  Comments
                                </TableHead>
                                <TableHead className="text-black">
                                  Documents
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {content.subclasses?.map((subcode, subIndex) => (
                                <TableRow key={subIndex}>
                                  <TableCell className="align-top">
                                    {subcode.subcode}
                                  </TableCell>
                                  <TableCell className="align-top">
                                    {subcode.category}
                                  </TableCell>
                                  <TableCell className="align-top">
                                    {subcode.strong}
                                  </TableCell>
                                  <TableCell className="align-top">
                                    {subcode.adequate}
                                  </TableCell>
                                  <TableCell className="align-top">
                                    {subcode.weak}
                                  </TableCell>
                                  <TableCell className="align-top">
                                    {subcode.score}
                                  </TableCell>
                                  <TableCell className="align-top">
                                    {
                                      (banksData as bank)?.codeAnalyses.filter(
                                        (assessment) =>
                                          assessment.code === content.code
                                      )[0]?.mitigatingControl
                                    }
                                  </TableCell>
                                  <TableCell className="align-top">
                                    {
                                      (banksData as bank)?.codeAnalyses.filter(
                                        (assessment) =>
                                          assessment.code === content.code
                                      )[0]?.mitigatingControlScore
                                    }
                                  </TableCell>
                                  <TableCell className="align-top">
                                    {
                                      (banksData as bank)?.codeAnalyses.filter(
                                        (assessment) =>
                                          assessment.code === content.code
                                      )[0]?.residualRiskScore
                                    }
                                  </TableCell>
                                  <TableCell className="align-top">
                                    {subcode.comments}
                                  </TableCell>
                                  <TableCell className="align-top">
                                    {subcode.documents}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex flex-col items-center">
            {(banksData as bank)?.codes?.length > 0 ? (
              <Button className="w-[100px] bg-blue-700 text-white hover:bg-blue-900 hover:text-white">
                Submit
              </Button>
            ) : (
              <div className="flex flex-col items-center justify-center gap-y-5  mt-3">
                <Button
                  type="button"
                  onClick={() => router.push("/codes/add-manage-codes")}
                  className="flex w-[100px] bg-blue-700 text-white hover:bg-blue-900 hover:text-white"
                >
                  Add codes
                </Button>

                <div className="flex">*Add Codes to start analysis</div>
              </div>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};
export default RiskAssementForm;

/* <Table className="h-full overflow-scroll">
                        <TableHeader>
                          <TableRow className="bg-black text-white">
                            <TableHead>#</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Strong(3)</TableHead>
                            <TableHead>Adequate(2)</TableHead>
                            <TableHead>Weak(1)</TableHead>
                            <TableHead>Score</TableHead>
                            <TableHead>Comments</TableHead>
                            <TableHead>Documents</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {content.sub_category_content.map(
                            (sub_content, index) => (
                              <TableRow key={index}>
                                <TableCell className="align-top">
                                  {sub_content.code}
                                </TableCell>
                                <TableCell className="align-top">
                                  {sub_content.category}
                                </TableCell>
                                <TableCell className="align-top">
                                  {sub_content.strong}
                                </TableCell>
                                <TableCell className="align-top">
                                  {sub_content.adequate}
                                </TableCell>
                                <TableCell className="align-top">
                                  {sub_content.weak}
                                </TableCell>
                                <TableCell className="align-top">
//                                   {/* {sub_content.score} */
// }
//           </TableCell>
//           <TableCell className="align-top">
//             {/* {sub_content.comments} */}
//           </TableCell>
//           <TableCell className="align-top">
//             {/* {sub_content.documents} */}
//           </TableCell>
//         </TableRow>
//       )
//     )}
//   </TableBody>
// </Table> */}
