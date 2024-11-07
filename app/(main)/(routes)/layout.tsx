import NavBar from "@/components/navbar";
import { db } from "@/lib/db";
import { Bank } from "@prisma/client";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  cookies().getAll();
  const supabase = await createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  

  const bank = await db.bank.findFirst({
    where: {
      users: {
        some: { email: user?.email },
      },
    },
  });
  

  return (
    <div className=" flex-col">
      <div className="flex w-full ">
        <NavBar bankId={bank?.id} />
      </div>
      <div className="flex flex-1 ">{children}</div>
    </div>
  );
};

export default Layout;
