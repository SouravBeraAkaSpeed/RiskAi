import { create_prompt } from "@/models/prompt_structure";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import {
  GoogleGenerativeAI,
  GenerateContentResult,
} from "@google/generative-ai";

const allowedOrigins = [
  "http://65.20.77.166",
  "http://localhost:3000",
  "http://localhost:3001",
  "https://riskai.vercel.app"
];


const apiKey = process.env.GOOGLE_GENAI_API_KEY;
if (!apiKey) {
  throw new Error(
    "Missing Google Generative AI API key in environment variables."
  );
}
// Instantiate the Google Generative AI client with your API key
const genAI = new GoogleGenerativeAI(apiKey); // Replace with actual API key

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();

    // Get previous analysis if provided
    const previous_analysis = body.previous_analysis || "";

    // Create the prompt using create_prompt
    const prompt = create_prompt(body.code, previous_analysis);
    console.log("Generated prompt:", prompt);

    // Read the content of the specified model file
    const modelFilePath = path.join(
      process.cwd(),
      "models",
      `${body.model}`
    );
    const systemInstruction = fs.readFileSync(modelFilePath, "utf-8");

    // Initialize the Gemini model with the system instruction
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction,
    });

    // Generate the AI response
    const result: GenerateContentResult = await model.generateContent([prompt]);
    const aiResponse = result?.response?.text() || "No response generated.";

    // Send the response as JSON
    const response = NextResponse.json({ response: aiResponse });
    response.headers.set(
      "Access-Control-Allow-Origin",
      "https://riskai.vercel.app"
    );
    response.headers.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    return response;
  } catch (error) {
    console.error("Error generating AI response:", error);
    return NextResponse.json(null);
  }
}

// Handle OPTIONS request for CORS

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


// import { prompt_example, create_prompt } from "@/models/prompt_structure";
// import axios from "axios";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     // const code_data= {code: "NRA",
//     // riskCategory: "NRA Customers",
//     // lowRisk: "The institution does not have any NRA accounts.",
//     // moderateRisk:
//     //   "Moderate level of NRA accounts from lower- risk geographies.",
//     // highRisk:
//     //   "Significant number of NRA accounts from higher-risk geographies.",}
//     const body = await req.json();
//     let previous_analysis = "";
//     if (body.previous_analysis) {
//       previous_analysis = body.previous_analysis;
//     }
//     const prompt = create_prompt(body.code, previous_analysis);
//     console.log("body:", body);
//     const res = await axios.post("http://localhost:11434/api/generate", {
//       model: body.model,
//       prompt: prompt,
//       stream: body.stream,
//       options: { num_ctx: 10000, temperature: 0 },
//     });

//     const data = await res.data;
//     const response = data.response;
//     // console.log(data);

//     const r = NextResponse.json({ response });
//     r.headers.set("Access-Control-Allow-Origin", "http://localhost:3001");
//     r.headers.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
//     r.headers.set(
//       "Access-Control-Allow-Headers",
//       "Content-Type, Authorization"
//     );

//     return r;
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(null);
//   }
// }

// export const OPTIONS = () => {
//   const response = NextResponse.json({});
//   response.headers.set("Access-Control-Allow-Origin", "http://localhost:3001");
//   response.headers.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
//   response.headers.set(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization"
//   );

//   return response;
// };
