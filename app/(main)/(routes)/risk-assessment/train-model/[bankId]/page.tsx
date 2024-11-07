"use client";
import { FileUpload } from "@/components/fileupload";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { getDataViaFiles } from "@/lib/server-actions/file-actions";
import {
  deleteFile,
  getFilesByBankId,
  uploadBankFiles,
} from "@/lib/supabase/queries";
import { FileUploadFormSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Loader2, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const Page = ({
  params,
}: {
  params: {
    bankId: string;
  };
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [Uploadingdocument, setUploadingdocument] = useState(false);
  const [files, setFiles] = useState<
    { id: string; filename: string; UploadedAt: string }[] | []
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [traingingCompleted, setTraingingCompleted] = useState(false);

  useEffect(() => {
    const getFiles = async () => {
      setIsLoading(true);
      const files_data = await getFilesByBankId(params.bankId);
      if (files_data) {
        const data = files_data.map((file) => {
          return {
            id: file.id,
            filename: file.filename,
            UploadedAt: file.createdAt.toDateString(),
          };
        });
        setFiles(data);
        console.log(data);
        setIsLoading(false);
      }
    };

    getFiles();
  }, [Uploadingdocument]);

  const documentDelete = async ({
    file,
    index,
  }: {
    file: {
      id: string;
      filename: string;
      UploadedAt: string;
    };
    index: number;
  }) => {
    setIsLoading(true);
    

    const model_name = `${file.filename
      .replaceAll(" ", "")
      .split(".")[0]
      .replaceAll("(", "")
      .replaceAll(")", "")}AiModelFile${index + 1}`;

    const model_fileName = `models/${params.bankId}_${file.filename
      .replaceAll(" ", "")
      .split(".")[0]
      .replaceAll("(", "")
      .replaceAll(")", "")}AiModelFile${index + 1}`;

    const res = await deleteFile({
      fileId: file.id,
      model_name,
      model_fileName,
    });
    if (res) {
      toast({
        title: "File Deleted",
        description:
          "Your File and Ai Training Context  has been deleted Successfully.",
      });
      setIsLoading(false);
    }
  };

  const filesForm = useForm<z.infer<typeof FileUploadFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FileUploadFormSchema),
    defaultValues: {
      files: [],
    },
  });

  const handleTraining = async () => {
    setIsTraining(true);
    await getDataViaFiles(params.bankId).then(() => {
      setIsTraining(false);
      setTraingingCompleted(true);
    });
  };

  const isFilesUploadLoading = filesForm.formState.isSubmitting;

  const onFilesUploadSubmit: SubmitHandler<
    z.infer<typeof FileUploadFormSchema>
  > = async (formData) => {
    console.log(formData);

    const filesData = formData.files.map((file) => {
      return {
        filename: file.fileName,
        file_url: file.file_url,
        bankId: params.bankId,
      };
    });

    console.log(filesData);
    await uploadBankFiles(filesData).then((res) => {
      toast({
        title: "Files Uploaded",
        description: "Files uploaded successfully",
      });
    });
  };
  return (
    <div className="w-full flex flex-col items-center justify-center">
      {isTraining && (
        <div className="z-10 fixed top-1/2 left-1/2 transform h-full w-full -translate-x-1/2 bg-opacity-80 bg-black text-2xl font-semibold   -translate-y-1/2 flex items-center justify-center">
          <Loader2 className="h-[50px] w-[50px] text-white animate-spin mr-2" />
          <p className="text-[50px] text-white dark:text-zinc-400">
            Training ...
          </p>
        </div>
      )}
      <Card className="w-1/2  flex items-center h-screen sm:h-auto  mt-10 shadow-indigo-500/50 shadow-lg bg-black text-white">
        <CardHeader>
          <CardTitle>Upload Your Bank's files</CardTitle>
          <CardDescription>
            These files will be used for training of your bank's Ai model
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                    <Loader2 className="h-7 w-7 text-white  animate-spin my-4" />
                  ) : (
                    "Upload Files"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>

      <div className="w-1/2">
        <Button
          type="button"
          className="my-10 w-full"
          onClick={() => handleTraining()}
        >
          {traingingCompleted ? (
            <>
              <CheckCircle /> Training Completed{" "}
            </>
          ) : (
            "Start Training"
          )}
        </Button>
      </div>

      {isLoading ? (
        <div className="flex text-white flex-1 justify-center items-center h-[300px]">
          <Loader2 className="h-7 w-7 text-white  animate-spin my-4" />
          <p className="text-xs text-white  ">Loading ...</p>
        </div>
      ) : (
        <div className="flex flex-col w-1/2 my-10">
          <div className="flex text-xl font-bold ">Uploaded Files</div>

          {files.map((file, index) => (
            <div key={index} className="py-6">
              <hr />
              <div className="flex mt-2">
                <div className="flex flex-1">{file.filename}</div>
                <div className="flex">{file.UploadedAt}</div>
                <div
                  className="flex mx-2 cursor-pointer text-blue-800"
                  onClick={() => documentDelete({ file, index })}
                >
                  <Trash />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
