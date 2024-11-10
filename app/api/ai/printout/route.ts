import { exec } from "child_process";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import {
  GoogleGenerativeAI,
  GenerateContentResult,
} from "@google/generative-ai";
import { PrintOutDataFormat } from "@/constant/riskAssesmentTableData";


const allowedOrigins = [
  "http://65.20.77.166",
  "http://localhost:3000",
  "http://localhost:3001",
];


const apiKey = process.env.GOOGLE_GENAI_API_KEY;
if (!apiKey) {
  throw new Error(
    "Missing Google Generative AI API key in environment variables."
  );
}
// Instantiate the Google Generative AI client with your API key
const genAI = new GoogleGenerativeAI(apiKey); // Replace with actual API key

function wrapText(text: string, lineLength: number): string {
  const lines = text.split('\n');
  const wrappedLines = lines.map(line => {
    if (line.startsWith('**') && line.endsWith('**')) {
      return line;
    }
    let wrappedLine = '';
    while (line.length > lineLength) {
      let wrapAt = line.lastIndexOf(' ', lineLength);
      if (wrapAt === -1) wrapAt = lineLength;
      wrappedLine += line.slice(0, wrapAt) + '\n';
      line = line.slice(wrapAt).trim();
    }
    wrappedLine += line;
    return wrappedLine;
  });
  return wrappedLines.join('\n');
}

function saveFormattedTextToFile(filePath: string, content: string) {
  const formattedContent = wrapText(content, 72);
  fs.writeFileSync(filePath, formattedContent);
}

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

    const systemInstruction = PrintOutDataFormat

    // Initialize the Gemini model with the system instruction
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction,
    });

    const result: GenerateContentResult = await model.generateContent([body.prompt]);
    const aiResponse = result?.response?.text() || "No response generated.";

    // const res = await axios.post("http://localhost:11434/api/generate", {
    //   model: "AnalysisPrintOut",
    //   prompt: body.prompt,
    //   stream: false,
    //   options: { num_ctx: 10000, temperature: 0 },
    // });

    // const data = await res.data;
    // const response = data.response;


    saveFormattedTextToFile(`public/files/${body.bankName.replaceAll(" ", "")}_PrintOut.txt`, aiResponse);

    

    exec(
      `python3 pdf_convertor.py  public/files/${body.bankName.replaceAll(
        " ",
        ""
      )}_PrintOut.txt --output public/files/${body.bankName.replaceAll(
        " ",
        ""
      )}_PrintOut.pdf`,
      (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
        } else if (stderr) {
          console.log(`stderr: ${stderr}`);
        } else {
          console.log(stdout);
        }
      }
    );

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

    const r = NextResponse.json({ aiResponse });
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
    console.log(error);
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
