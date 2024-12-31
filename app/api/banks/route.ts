import { db } from "@/lib/db";
import { code } from "@/types";
import { NextResponse } from "next/server";



const allowedOrigins = [
  "http://65.20.77.166",
  "http://localhost:3000",
  "http://localhost:3001",
  "https://riskai.vercel.app"
];


export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const bankId = searchParams.get("bankId");

    if (bankId) {
      console.log("bankID : ", bankId);
      // await db.$connect();
      let banks = await db.bank.findUnique({
        where: {
          id: bankId,
        },
        include: {
          codes: {
            include: {
              subclasses: true, // Include associated subclasses for each code
            },
          }, // Include associated codes
          codeAnalyses: true, // Include associated code analyses
        },
      });
      // await db.$disconnect();
      // console.log(banks)
      if (!banks) {
        return new NextResponse("No banks found", { status: 200 });
      } else {
        return NextResponse.json(banks);
      }
    }

    return new NextResponse("No banks Given", { status: 200 });
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function POST(req: Request) {
  try {
    const { name, address } = await req.json();

    const existingaddress = await db.bank.findMany({
      where: {
        address: address,
      },
    });

    if (existingaddress.length > 0) {
      return new NextResponse("Already a bank suitated at this address.", {
        status: 409,
      });
    }

    // Create a new bank entry
    const newBank = await db.bank.create({
      data: {
        name,
        address,
      },
    });

    return NextResponse.json(newBank);
  } catch (error: any) {
    console.error(`Error uploading bank data: ${error.message}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { bankId, name, codes, address } = await req.json();

    // Check if any of the codes already exist in the database
    const existingCodes = await db.code.findMany({
      where: {
        code: { in: codes.map((code: code) => code.code) },
      },
    });

    if (existingCodes.length > 0) {
      // Return a response indicating that the code is already present
      return new NextResponse("Code already present", { status: 200 });
    }

    // Create a new bank entry
    const newBank = await db.bank.update({
      where: {
        id: bankId,
      },
      data: {
        name,
        address,
        codes: {
          create: codes.map((code: code) => ({
            code: code.code,
            riskCategory: code.riskCategory,
            lowRisk: code.lowRisk,
            moderateRisk: code.moderateRisk,
            highRisk: code.highRisk,
          })),
        },
      },
      include: {
        codes: true, // Include associated codes in the response
      },
    });

    const origin = req.headers.get("origin");

    const successResponse = NextResponse.json(newBank);
    if (origin && allowedOrigins.includes(origin)) {
      successResponse.headers.set("Access-Control-Allow-Origin", origin);
    }
    successResponse.headers.set(
      "Access-Control-Allow-Methods",
      "POST, GET, OPTIONS"
    );
    successResponse.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    return successResponse;

  } catch (error: any) {
    console.error(`Error uploading bank data: ${error.message}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}



export const OPTIONS = (req: Request) => {
  const response = NextResponse.json({});

  const origin = req.headers.get("origin");
  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }
  response.headers.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  return response;
};