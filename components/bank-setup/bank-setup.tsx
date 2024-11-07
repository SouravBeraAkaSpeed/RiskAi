"use client";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 } from "uuid";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { Label } from "../ui/label";
import { Input } from "../ui/input";

import { Button } from "../ui/button";
import Loader from "../global/loader";
import { createAndUpdateBank, uploadBankFiles } from "@/lib/supabase/queries";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { CreateBankFormSchema, FileUploadFormSchema } from "@/lib/types";
import { z } from "zod";

import { Bank } from "@prisma/client";
import { FileUpload } from "../fileupload";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { codes } from "@/constant/riskAssesmentTableData";

interface BankSetupProps {
  bank?: Bank | null;
}

const BankSetup: React.FC<BankSetupProps> = ({ bank }) => {
  const { toast } = useToast();
  const router = useRouter();
  const [Uploadingdocument, setUploadingdocument] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting: isLoading, errors },
  } = useForm<z.infer<typeof CreateBankFormSchema>>({
    mode: "onChange",
    defaultValues: {
      address: "",
      bankName: "",
    },
  });

  const filesForm = useForm<z.infer<typeof FileUploadFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FileUploadFormSchema),
    defaultValues: {
      files: [],
    },
  });

  const isFilesUploadLoading = filesForm.formState.isSubmitting;

  const onFilesUploadSubmit: SubmitHandler<
    z.infer<typeof FileUploadFormSchema>
  > = async (formData) => {
    console.log(formData);
    setUploadingdocument(true);

    const filesData = formData.files.map((file) => {
      return {
        filename: file.fileName,
        file_url: file.file_url,
        bankId: bank?.id,
      };
    });

    console.log(filesData);
    await uploadBankFiles(filesData).then((res) => {
      toast({
        title: "Files Uploaded",
        description: "Files uploaded successfully",
      });

      router.push(`/dashboard/${bank?.id}`);
      setUploadingdocument(false);
    });
  };

  const onSubmit: SubmitHandler<z.infer<typeof CreateBankFormSchema>> = async (
    value
  ) => {
    const bankUUID = v4();

    try {
      const newBank: Bank = {
        createdAt: new Date(),
        id: bankUUID,
        status: "basic",
        name: value.bankName,
        address: value.address,
        updatedAt: new Date(),
      };
      const codesWithsubcode = codes;

      toast({
        title: "Creating Bank",
        description: `${newBank.name} has being created. Initialization of codes may take a min or so .`,
      });
      const { data, error: createError } = await createAndUpdateBank(
        newBank,
        codesWithsubcode
      );
      if (data) {
        toast({
          title: "Initialization Complete",
          description: `Initialization Successfully Complete.`,
        });

        router.replace(`/dashboard/${data.id}`);
      } else {
        toast({
          title: "Error Occured",
          description: `${newBank.name} bank creation failed!! `,
        });
      }
    } catch (error) {
      console.log(error, "Error");
      toast({
        variant: "destructive",
        title: "Could not create your bank",
        description:
          "Oops! Something went wrong, and we couldn't create your workspace. Try again or come back later.",
      });
    } finally {
      reset();
    }
  };

  return (
    <Card
      className="w-[800px]
      h-screen
      sm:h-auto
      shadow-indigo-500/50
      bg-black
      text-white
  "
    >
      <CardHeader>
        <CardTitle>
          {" "}
          {bank
            ? "Upload Your Bank's files"
            : "Upload Your Bank Information"}{" "}
        </CardTitle>
        <CardDescription>
          {bank
            ? "These files will be used for training of your bank's Ai model"
            : " Lets upload your bank info to get you started.You can add only one bank info with one email."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {bank ? (
          <div>
            <Form {...filesForm}>
              <form
                onSubmit={filesForm.handleSubmit(onFilesUploadSubmit)}
                className="w-full text-black my-6 mx-0 space-y-4 flex flex-col "
              >
                {Uploadingdocument ? (
                  <div className="flex text-white flex-1 justify-center items-center h-[300px]">
                    <Loader2 className="h-7 w-7 text-white  animate-spin my-4" />
                    <p className="text-xs text-white  ">Loading ...</p>
                  </div>
                ) : (
                  <div className="flex flex-col  w-full">
                    <Label htmlFor="school" className="text-white">
                      Files*
                    </Label>
                    <FormField
                      disabled={isFilesUploadLoading}
                      control={filesForm.control}
                      name="files"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <FileUpload
                              onChange={field.onChange}
                              setUploadingdocument={setUploadingdocument}
                              value={field.value}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={Uploadingdocument}
                  variant="ghost"
                  className="border-2 border-black bg-gray-300  hover:text-black w-full"
                >
                  {Uploadingdocument ? (
                    <div className="flex text-white flex-1 justify-center items-center h-[300px]">
                      <Loader2 className="h-7 w-7 text-white  animate-spin my-4" />
                      <p className="text-xs text-white">&nbsp; Loading...</p>
                    </div>
                  ) : (
                    "Upload Files"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="w-full ">
                  <Label
                    htmlFor="workspaceName"
                    className="text-sm text-muted-foreground text-white"
                  >
                    Name
                  </Label>
                  <Input
                    id="bankName"
                    type="text"
                    className="text-white"
                    placeholder="Bank Name"
                    disabled={isLoading}
                    {...register("bankName", {
                      required: "Workspace name is required",
                    })}
                  />
                  <small className="text-red-600">
                    {errors?.bankName?.message?.toString()}
                  </small>
                </div>
              </div>

              <div>
                <Label
                  htmlFor="logo"
                  className="text-sm text-muted-foreground text-white"
                >
                  Bank Address
                </Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="Bank Address"
                  className="text-white"
                  disabled={isLoading}
                  {...register("address", {
                    required: "Bank Address is required",
                  })}
                />
                <small className="text-red-600">
                  {errors?.address?.message?.toString()}
                </small>
              </div>

              <div className="self-end">
                <Button disabled={isLoading} type="submit">
                  {!isLoading ? (
                    "Create Bank"
                  ) : (
                    <div className="flex text-white flex-1 justify-center items-center h-[300px]">
                      <Loader2 className="h-7 w-7 text-white  animate-spin my-4" />
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default BankSetup;
