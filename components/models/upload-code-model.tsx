"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { AddCodeFormSchema } from "@/lib/types";
import { addCodes } from "@/lib/supabase/queries";
import { toast } from "../ui/use-toast";
import { useEffect } from "react";

export const UploadCodeModal = () => {
  const { isOpen, onClose, type, data, isFetching } = useModal();

  const isModalOpen = isOpen && type === "addCode";
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(AddCodeFormSchema),
    defaultValues: {
      code: "",
      riskCategory: "",
      lowRisk: "",
      moderateRisk: "",
      highRisk: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof AddCodeFormSchema>) => {
    try {
      console.log(values);
      isFetching({ ...data, fetching: true });
      const bank = await addCodes({
        codes: [values],
        bankId: data.bankId ?? "",
      });
      if (bank) {
        toast({
          title: "Code Uploaded",
          description: "Your code is successfully Uploded!!",
        });
      }
      form.reset();
      
      router.refresh();
      onClose();
    } catch (error) {
      console.log("Error at axios: ", error);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  useEffect(() => {
    if (data.code) {
      form.reset({
        code: data.code.code,
        riskCategory: data.code.riskCategory,
        lowRisk: data.code.lowRisk,
        moderateRisk: data.code.moderateRisk,
        highRisk: data.code.highRisk,
      });
    }
  }, [data.code]);

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white p-0 text-black overflow-hidden shadow-xl">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Add New Code
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Give your bank a new Creteria for Risk Analysis with a new code .
            You can also change it later.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className="uppercase text-xs font-bold
                     text-zinc-500 dark:text-secondary/70"
                    >
                      Code
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black 
                        focus-visible:ring-offset-0"
                        placeholder="Ex : CB"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="riskCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className="uppercase text-xs font-bold
                     text-zinc-500 dark:text-secondary/70"
                    >
                      Risk Category
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black 
                        focus-visible:ring-offset-0"
                        placeholder="Ex : Customer Base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lowRisk"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className="uppercase text-xs font-bold
                     text-zinc-500 dark:text-secondary/70"
                    >
                      Low Risk Criteria
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black 
                        focus-visible:ring-offset-0"
                        placeholder="Ex : Stable homogenous community bank, customers are predominately consumers."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="moderateRisk"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className="uppercase text-xs font-bold
                     text-zinc-500 dark:text-secondary/70"
                    >
                      Moderate Risk Criteria
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black 
                        focus-visible:ring-offset-0"
                        placeholder="Ex : The customer base is increasing due to branching, mergers, or acquisitions. The customer base is regional."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="highRisk"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className="uppercase text-xs font-bold
                     text-zinc-500 dark:text-secondary/70"
                    >
                      High Risk Criteria
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black 
                        focus-visible:ring-offset-0"
                        placeholder="Ex : The customer base is derived from doing business in high-risk geographic locations (domestic and foreign) or a diverse metropolitan area."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button variant="primary" disabled={isLoading}>
                Add
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
