
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
// import fs from "fs";
// import { jsPDF } from "jspdf";
// import PDFKit from "pdfkit";

const allowedOrigins = [
  "http://65.20.77.166",
  "http://localhost:3000",
  "http://localhost:3001",
  "https://riskai.vercel.app"
];

export async function POST(req: NextRequest) {
  try {
    // const code_data= {code: "NRA",
    // riskCategory: "NRA Customers",
    // lowRisk: "The institution does not have any NRA accounts.",
    // moderateRisk:
    //   "Moderate level of NRA accounts from lower- risk geographies.",
    // highRisk:
    //   "Significant number of NRA accounts from higher-risk geographies.",}
    const body = await req.json();

    const res = await axios.post("http://65.20.77.166/api/ai/printout", {
      prompt: body.prompt,
      bankName: body.bankName,
    });

    const data = await res.data;
    const response = data.response;

    // fs.writeFileSync(
    //   `public/files/${body.bankName.replaceAll(" ", "")}_PrintOut.txt`,
    //   response
    // );

    // const doc = new jsPDF();
    // // add your content to the document here, as usual

    // const pdf = new PDFKit();
    // pdf.text(response);
    // pdf.pipe(fs.createWriteStream("text-file.pdf"));
    // pdf.end();
    // const pdf = new jsPDF();
    // pdf.text(response, 10, 10);
    // pdf.save(`public/files/${body.bankName.replaceAll(" ", "")}_PrintOut.pdf`);
    // get a blob when you're done
    // doc.pipe(fs.createWriteStream(`public/files/${body.bankName.replaceAll(" ", "")}_PrintOut.pdf`));
    // doc.end();
    // console.log(data);

    const r = NextResponse.json({ response });
    const origin = req.headers.get("origin");
    if (origin && allowedOrigins.includes(origin)) {
      r.headers.set("Access-Control-Allow-Origin", origin);
    }
    r.headers.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    r.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    return r;
  } catch (error) {
    // console.log(error);
    return NextResponse.json(null);
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
