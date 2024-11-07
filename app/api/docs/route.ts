import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const loader = new PDFLoader(
    "assets/docs/test1.pdf"
  );

  const docs = await loader.load();
  console.log(docs);
  return new NextResponse(" test done!!", { status: 200 });
}
