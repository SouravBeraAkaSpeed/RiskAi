"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useModal } from "@/hooks/use-modal-store";
import { getBanksData } from "@/lib/bankData";
import { customers } from "@/types";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const page = () => {
  const { onOpen } = useModal();
  const [isMounted, setIsMounted] = useState(false)

  const [customers, setCustomers] = useState<customers[]>([]);
  useEffect(() => {
    const getCustomes = async () => {
      await getBanksData()
        .then((response) => {
          console.log(response);
          setCustomers(response);
        })
        .catch((error: any) => {
          console.log(error);
        });
    };

    getCustomes();
  }, [customers]);

  useEffect(() => {
    setIsMounted(true)
  }, [])


  if(!isMounted){
    return (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin mr-2" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading ...
        </p>
      </div>
    )
  }
  

  return (
    <div className="flex flex-col  lg:m-[120px] mt-[80px]   w-full">
      <div className="flex flex-row w-full m-2">
        <div className="flex flex-1 mx-3">
          <h1 className="text-xl font-semibold">Manage Customers</h1>
        </div>
        <div className="flex mx-3">
          <Button variant="primary" onClick={() => onOpen("addCustomer")}>
            Add customer
          </Button>
        </div>
      </div>

      <div className="flex w-full mt-10 m-2">
        <Table>
          <TableHeader>
            <TableRow className="text-xl  font-extrabold border-b-2 border-b-white">
              <TableHead>CustomerId</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Last Updated At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.id}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.address}</TableCell>
                <TableCell>{customer.createdAt}</TableCell>
                <TableCell>{customer.updatedAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default page;
