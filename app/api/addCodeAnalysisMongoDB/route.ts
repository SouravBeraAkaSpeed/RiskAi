import { addCodeAnalysis } from "@/lib/addCodeAnalysisToDB";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log("runned3");
    const assesment = await req.json();
    console.log(assesment);
    // return null

    const response = await addCodeAnalysis(assesment);

    if (response) {
      console.log(response);
      return NextResponse.json(response);
    } else {
      console.error(`Error Anlysing bank data`);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  } catch (error) {
    console.log("ERROR IN ADD_CODE_TO_MONGO_ROUTE", error);
  }
}
