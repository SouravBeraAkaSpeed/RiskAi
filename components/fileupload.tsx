"use client";

import { FileIcon, X } from "lucide-react";

import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { useSupabaseUser } from "./providers/supabase-user-provider";
import { v4 } from "uuid";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface FileUploadProps {
  onChange: (url?: { fileName: string; file_url: string }[]) => void;
  setUploadingdocument: React.Dispatch<React.SetStateAction<boolean>>;
  value: { fileName: string; file_url: string }[];
}
export const FileUpload = ({
  onChange,
  value,
  setUploadingdocument,
}: FileUploadProps) => {
  const { state } = useSupabaseUser();
  const [profileId, setProfileId] = useState("");
  let paths: { fileName: string; file_url: string }[] = [];

  useEffect(() => {
    if (state.user) setProfileId(state.user.id);
  }, [state]);

  interface onQualificationDocumentUploadProps {
    e: React.ChangeEvent<HTMLInputElement>;
  }
  const onBankDocumentUpload = async ({
    e,
  }: onQualificationDocumentUploadProps) => {
    console.log("called");
    const supabase = createClientComponentClient();
    if (!profileId) return;
    console.log(e.target.files);
    const files = e.target.files;

    if (!files) return;

    setUploadingdocument(true);
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        console.log(`File name: ${file.name}, size: ${file.size}`);
        const uuid = v4();
        setUploadingdocument(true);
        const { data, error } = await supabase.storage
          .from("bank-files")
          .upload(`bankFiles.${file.size}.${profileId}.${uuid}`, file, {
            cacheControl: "3600",
            upsert: true,
          });
        if (!error) {
          console.log(data);
          const url = supabase.storage
            .from("bank-files")
            .getPublicUrl(`bankFiles.${file.size}.${profileId}.${uuid}`)
            ?.data.publicUrl;
          const path = {
            file_url: url,
            fileName: file.name,
          };
          paths.push(path);
          console.log(paths);
          onChange(paths);
        }
      }
    }

    setUploadingdocument(false);
  };

  return (
    <>
      {value?.map((v, index) => (
        <div
          className="relative flex items-center p-4  rounded-md bg-background/10 border-2 mt-3 "
          key={index}
        >
          <FileIcon className="h-12 w-10 ml-10 fill-indigo-200 stroke-indigo-400" />
          <span className="text-blue-600">{v.fileName}</span>
          <button
            onClick={() => onChange([])}
            className="bg-rose-500 text-white p-1 rounded-full absolute top-1 right-1 shadow-sm"
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
      <Input
        type="file"
        accept="application/pdf,application/vnd.ms-excel,.txt,.docx"
        className="text-black  mt-2 dark:text-white w-full"
        onChange={(e) => {
          onBankDocumentUpload({ e });
        }}
        multiple
      />
    </>
  );
};
