import { z } from "zod";

export const FormSchema = z.object({
  email: z.string().describe("Email").email({ message: "Invalid Email" }),
  password: z.string().describe("Password").min(1, "Password is required"),
});

export const CreateBankFormSchema = z.object({
  bankName: z
    .string()
    .describe("Bank Name")
    .min(1, "Bank name must be min of 1 character"),
  address: z
    .string()
    .describe("Bank Address")
    .min(1, "Bank name must be min of 1 character"),
});

export const FileUploadFormSchema = z.object({
  files: z.array(
    z.object({
      fileName: z
        .string()
        .describe("File Name")
        .min(1, "File Name must be min of 1 character"),
      file_url: z.string().describe("File url"),
    })
  ),
});

export const AddCodeFormSchema = z.object({
  code: z
    .string()
    .describe("Code")
    .min(1, "Code Name must be min of 1 character long."),
  riskCategory: z.string().describe("Risk Category"),
  lowRisk: z.string().describe("Low Risk Factor"),
  moderateRisk: z.string().describe("Moderate Risk Factor"),
  highRisk: z.string().describe("High  Risk Factor"),
});

export const SearchCodeSchema = z.object({
  searchkey: z.string().describe("Search keyword").optional(),
});
