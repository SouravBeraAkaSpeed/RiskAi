"use client";

import { logo } from "@/assets/images";
import {
  ChevronDown,
  ChevronUp,
  LayoutDashboardIcon,
  Menu,
  MoveDown,
  Star,
  Text,
} from "lucide-react";
import Image from "next/image";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { getBankWithId } from "@/lib/supabase/queries";
import { bank } from "@/types";

const SideBar = ({ bankId }: { bankId: string | undefined }) => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [codes, setCodes] = useState(false);
  const [riskAssessment, setRiskAssessment] = useState(false);
  const [bankName, setBankName] = useState<string>("");
  const [bank, setBank] = useState<{
    id: string;
    name: string;
    address: string;
    createdAt: Date;
    updatedAt: Date | null;
    status: string | null;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchBank = async () => {
      setIsLoading(true);
      const bank = await getBankWithId(bankId!!);
      // console.log(bankId);
      if (bank) {
        setBankName(bank.name);
        setBank(bank);
        // console.log(bank.name);
      }

      setIsLoading(false);
    };

    if (bankId) {
      fetchBank();
    }
  }, [bankId]);

  if (!isMounted) return null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="dark:bg-black bg-white overflow-auto"
      >
        <div className="flex flex-col  w-[300px] ">
          <Link href="/">
            <div className="w-full  text-4xl font-bold flex items-center text-center justify-start  my-10 text-purple-900 ">
              {bankName.toUpperCase()}
            </div>
          </Link>

          <Link
            href="/dashboard"
            className={`${
              pathname === "/dashboard" ? "bg-gray-900" : ""
            } hover:bg-gray-800`}
          >
            <div className="flex gap-x-3 items-center h-12 w-full justify-start ml-10 ">
              <LayoutDashboardIcon />
              <h1 className="text-xl ">Dashboard</h1>
            </div>
          </Link>

          {/* <div className="hover:bg-gray-800">
              <div
                onClick={() => setLookup((prev) => !prev)}
                className="flex gap-x-3 items-center h-12  justify-start ml-10 z-2 "
              >
                <Text />
                <h1 className="text-xl ">Lookups</h1>
                <MoveDown />
              </div>

              {lookup && (
                <ul className="w-full flex flex-col items-start bg-white  dark:bg-black  py-3 z-10">
                  <li
                    className={`
                  ${
                    pathname === "/lookups/customer-type" ? "bg-gray-900" : ""
                  } w-full text-lg hover:bg-gray-800
                `}
                  >
                    <Link href="/lookups/customer-type" className="ml-14">
                      Customer Types
                    </Link>
                  </li>
                  <li
                    className={`
                  ${
                    pathname === "/lookups/business-type" ? "bg-gray-900" : ""
                  } w-full text-lg hover:bg-gray-800
                `}
                  >
                    <Link href="/lookups/business-type" className="ml-14">
                      Business Types
                    </Link>
                  </li>
                  <li
                    className={`
                  ${
                    pathname === "/lookups/education-level" ? "bg-gray-900" : ""
                  } w-full text-lg hover:bg-gray-800
                `}
                  >
                    <Link href="/lookups/education-level" className="ml-14">
                      Education Level
                    </Link>
                  </li>
                  <li
                    className={`
                  ${
                    pathname === "/lookups/bsa-basis" ? "bg-gray-900" : ""
                  } w-full text-lg hover:bg-gray-800
                `}
                  >
                    <Link href="/lookups/bsa-basis" className="ml-14">
                      BSA-Basis
                    </Link>
                  </li>
                  <li
                    className={`
                  ${
                    pathname === "/lookups/bsa-controls" ? "bg-gray-900" : ""
                  } w-full text-lg hover:bg-gray-800
                `}
                  >
                    <Link href="/lookups/bsa-controls" className="ml-14">
                      BSA-Controls
                    </Link>
                  </li>
                  <li
                    className={`
                  ${
                    pathname === "/lookups/ofac-basis" ? "bg-gray-900" : ""
                  } w-full text-lg hover:bg-gray-800
                `}
                  >
                    <Link href="/lookups/ofac-basis" className="ml-14">
                      OFAC-Basis
                    </Link>
                  </li>
                  <li
                    className={`
                  ${
                    pathname === "/lookups/ofac-basis" ? "bg-gray-900" : ""
                  } w-full text-lg hover:bg-gray-800
                `}
                  >
                    <Link href="/lookups/ofac-controls" className="ml-14">
                      OFAC-Controls
                    </Link>
                  </li>
                </ul>
              )}
            </div> */}

          <div className="hover:bg-gray-800">
            <div
              onClick={() => setCodes((prev) => !prev)}
              className="flex gap-x-3 items-center h-12  justify-start ml-10 z-2"
            >
              <Star />
              <h1 className="text-xl ">Codes</h1>
              {codes ? <ChevronUp /> : <ChevronDown />}
            </div>
            {codes && (
              <ul className="w-full flex flex-col items-start  bg-white  dark:bg-black py-3 z-10">
                {/* <li
                    className={`
                    ${
                      pathname === "/codes/manage-codes" ? "bg-gray-900" : ""
                    } w-full text-md  hover:bg-gray-800

                  `}
                  >
                    <Link href="/codes/manage-codes" className="ml-14">
                      Manage Codes
                    </Link>
                  </li> */}
                <li
                  className={`
                    ${
                      pathname === "/codes/add-manage-codes"
                        ? "bg-gray-900"
                        : ""
                    } w-full text-md hover:bg-gray-800
                  `}
                >
                  <Link href="/codes/add-manage-codes" className="ml-14">
                    Add & Manage Codes
                  </Link>
                </li>
                <li
                  className={`
                    ${
                      pathname === "/codes/risk-analysis-of-code"
                        ? "bg-gray-900"
                        : ""
                    } w-full text-md hover:bg-gray-800
                  `}
                >
                  <Link href="/codes/risk-analysis-of-code" className="ml-14">
                    Risk Analysis of code
                  </Link>
                </li>
                {/* <li
                    className={`
                    ${
                      pathname === "/customers/customer-risk-factor"
                        ? "bg-gray-900"
                        : ""
                    } w-full text-md hover:bg-gray-800
                  `}
                  >
                    <Link
                      href="/customers/customer-risk-factor"
                      className="ml-14"
                    >
                      Customer Risk Factor
                    </Link>
                  </li> */}
                {/* <li
                    className={`
                    ${
                      pathname === "/customers/customer-risk-factor-list"
                        ? "bg-gray-900"
                        : ""
                    } w-full text-md hover:bg-gray-800
                  `}
                  >
                    <Link
                      href="/customers/customer-risk-factor-list"
                      className="ml-14"
                    >
                      Customer Risk Factors List
                    </Link>
                  </li> */}
              </ul>
            )}
          </div>

          <div className="hover:bg-gray-800">
            <div
              onClick={() => setRiskAssessment((prev) => !prev)}
              className="flex gap-x-3 items-center h-12  justify-start ml-10 z-2"
            >
              <Star />
              <h1 className="text-xl ">Risk Assessment Ai</h1>
              {riskAssessment ? <ChevronUp /> : <ChevronDown />}
            </div>

            {riskAssessment && (
              <ul className="w-full flex flex-col items-start  bg-white  dark:bg-black py-3 z-10">
                <li
                  className={`
                    ${
                      pathname === "/risk-assessment/bsa-ra"
                        ? "bg-gray-900"
                        : ""
                    } w-full text-lg hover:bg-gray-800
                  `}
                >
                  <Link href="/risk-assessment/bsa-ra" className="ml-14">
                    BSA-RA
                  </Link>
                </li>
                <li
                  className={`
                    ${
                      pathname === "/risk-assessment/train-model"
                        ? "bg-gray-900"
                        : ""
                    } w-full text-lg hover:bg-gray-800
                  `}
                >
                  <Link href="/risk-assessment/train-model" className="ml-14">
                    Train Model
                  </Link>
                </li>
                {/* <li
                    className={`
                    ${
                      pathname === "/risk-assessment/ofac-ra" ? "bg-gray-900" : ""
                    } w-full text-lg hover:bg-gray-800 
                  `}
                  >
                    <Link href="/risk-assessment/ofac-ra" className="ml-14">
                      OFAC-RA
                    </Link>
                  </li> */}
                {/* <li
                    className={`
                    ${
                      pathname === "/risk-assessment/bsa-risk-matrix"
                        ? "bg-gray-900"
                        : ""
                    } w-full text-lg hover:bg-gray-800 
                  `}
                  >
                    <Link
                      href="/risk-assessment/bsa-risk-matrix"
                      className="ml-14"
                    >
                      BSA Risk Matrix
                    </Link>
                  </li> */}
                {/* <li
                    className={`
                    ${
                      pathname === "/risk-assessment/ofac-risk-matrix"
                        ? "bg-gray-900"
                        : ""
                    } w-full text-lg hover:bg-gray-800
                  `}
                  >
                    <Link
                      href="/risk-assessment/ofac-risk-matrix"
                      className="ml-14"
                    >
                      OFAC Risk Matrix
                    </Link>
                  </li> */}
                <li
                  className={`
                    ${
                      pathname === "/risk-assessment/print-reports"
                        ? "bg-gray-900"
                        : ""
                    } w-full text-lg hover:bg-gray-800
                  `}
                >
                  <Link href="/risk-assessment/print-reports" className="ml-14">
                    Print Reports
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SideBar;
