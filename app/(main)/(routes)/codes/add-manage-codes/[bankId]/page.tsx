"use client";
import Loader from "@/components/global/loader";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { toast, useToast } from "@/components/ui/use-toast";
import { useModal } from "@/hooks/use-modal-store";
import { deleteCodeWithBankId, getCodesWithId } from "@/lib/supabase/queries";
import { SearchCodeSchema } from "@/lib/types";
import { code } from "@/types";
import {
  Edit,
  Loader2,
  PlusIcon,
  Search,
  SearchIcon,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Form, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const Page = ({
  params,
}: {
  params: {
    bankId: string;
  };
}) => {
  const { onOpen, data, isFetching } = useModal();
  const [codes, setCodes] = useState<code[]>([]);
  const [isfetching, setIsfetching] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting: isSearchCodeLoading, errors },
  } = useForm<z.infer<typeof SearchCodeSchema>>({
    mode: "onChange",
    defaultValues: {
      searchkey: "",
    },
  });

  const onSearchCodeSubmit: SubmitHandler<
    z.infer<typeof SearchCodeSchema>
  > = async (value) => {
    console.log(value);
  };

  const handleDelete = async (code: code) => {
    isFetching({ ...data, fetching: true });
    const codeData = await deleteCodeWithBankId(params.bankId, code.code);
    if (codeData) {
      console.log(codeData);
      toast({
        title: "Code Delete",
        description: "Your code is successfully Deleted!!",
      });
      isFetching({ ...data, fetching: false });
    }
  };

  useEffect(() => {
    const fetchCodes = async () => {
      setIsfetching(true);
      const codesData = await getCodesWithId(params.bankId);
      if (codesData) {
        setCodes(codesData);
        console.log(codesData);
      }
      setIsfetching(false);
      isFetching({ ...data, fetching: false });
    };
    fetchCodes();
    if (data.fetching) setIsfetching(true);
    setIsfetching(false);
  }, [params.bankId, data.fetching]);

  return (
    <div className="flex flex-col justify-center w-full lg:px-[200px] px-[20px] py-[100px] ">
      <div className="flex flex-col border-2 min-h-[400px]  rounded-[10px] shadow-lg shadow-purple-300 p-10">
        <div className="flex w-full md:flex-row flex-col items-center md:space-x-10 ">
          <div className="text-xl font-bold md:flex-1 w-full">
            Codes
          </div>
          <div className="flex md:flex-row flex-col md:mt-0 mt-5 items-center ">
            <form onSubmit={handleSubmit(onSearchCodeSubmit)}>
              <div className="flex  gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-full ">
                    <Input
                      id="searchkey"
                      type="text"
                      className="text-white w-full lg:w-[200px]"
                      placeholder="🔍 Search Code ..."
                      disabled={isSearchCodeLoading}
                      {...register("searchkey")}
                    />
                    <small className="text-red-600">
                      {errors?.searchkey?.message?.toString()}
                    </small>
                  </div>
                </div>

                <div className="self-end ">
                  <Button disabled={isSearchCodeLoading} type="submit">
                    {!isSearchCodeLoading ? <SearchIcon /> : <Loader />}
                  </Button>
                </div>
              </div>
            </form>
            <Button
              className=" w-full mt-5 md:mt-0 md:mx-2"
              onClick={() =>
                onOpen("addCode", { bankId: params.bankId, code: {} as code })
              }
            >
              Add Code <PlusIcon />
            </Button>
          </div>
        </div>
        <hr className="my-5 flex " />

        {isSearchCodeLoading || isfetching ? (
          <div className="flex text-white flex-1 justify-center items-center h-[300px]">
            <Loader2 className="h-7 w-7 text-white  animate-spin my-4" />
            <p className="text-xs text-white  ">Loading The Codes...</p>
          </div>
        ) : (
          <>
            {codes.length === 0 && (
              <div className="flex flex-col items-center justify-center min-h-[400px]">
                <div className="font-bold text-4xl mt-10">No Codes Added</div>
                <div className="text-gray-400">
                  Kindly add codes to start analysis{" "}
                </div>
              </div>
            )}

            {codes.map((code: code, index) => (
              <div
                key={index}
                className="flex m-5 border-2 rounded-[20px] p-10 items-center shadow-xl"
              >
                <div className="flex-1 flex-col ">
                  <div className="flex text-2xl font-bold">{code.code}</div>
                  <div className="flex text-gray-600">{code.riskCategory}</div>
                </div>
                <div className="flex px-10">
                  <div
                    className="flex mx-2 cursor-pointer"
                    onClick={() =>
                      onOpen("addCode", { bankId: params.bankId, code: code })
                    }
                  >
                    <Edit />
                  </div>
                  <div
                    className="flex mx-2 cursor-pointer"
                    onClick={() => handleDelete(code)}
                  >
                    <Trash />
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
