import Loader from "@/components/global/loader";
import { db } from "@/lib/db";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  cookies().getAll();
  const supabase = await createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const bank = await db.bank.findFirst({
      where: {
        users: {
          some: { id: user?.id },
        },
      },
    });

    if (bank) redirect(`/risk-assessment/train-model/${bank?.id}`);
  }

  return <Loader />;
};

export default Page;
