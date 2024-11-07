"use server";

import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { DocxLoader } from "langchain/document_loaders/fs/docx";
import fs from "fs";
import { create_model } from "@/models/prompt_structure";
import { getFilesByBankId } from "../supabase/queries";



export const getDataViaFiles = async (bankId: string) => {
  try {
    const web_files = await getFilesByBankId(bankId);

    let loader;
    web_files?.forEach(async (file) => {
      let doc_data = "";
      const data = await fetch(file.file_url);
      const blob = await data.blob();
      if (file.filename.split(".")[1] === "pdf") {
        loader = new PDFLoader(blob);
      } else {
        loader = new DocxLoader(blob);
      }
      const docs = await loader.load();

      //   embeddAndStoreData(docs);

      //   console.log("Embedding done!");
      for (let index = 0; index < docs.length; index++) {
        doc_data += `. Document Name - ${file}  ${
          file.filename.split(".")[1] === "pdf"
            ? ", Page " + docs[index].metadata.loc.pageNumber
            : ""
        }  - ${docs[index].pageContent.replaceAll("\n", "")}`;
      }
      doc_data += "\n";
      console.log(file, doc_data.length);

      const { exec } = require("child_process");
      if (doc_data.length > 50000) {
        let times = doc_data.length / 50000;

        for (let index = 0; index < times; index++) {
          if (index + 1 < times) {
            fs.writeFileSync(
              `models/${bankId}_${file.filename
                .replaceAll(" ", "")
                .split(".")[0]
                .replaceAll("(", "")
                .replaceAll(")", "")}AiModelFile${index + 1}`,
              create_model(doc_data.slice(index * 50000, (index + 1) * 50000))
            );
          } else {
            fs.writeFileSync(
              `models/${bankId}_${file.filename
                .replaceAll(" ", "")
                .split(".")[0]
                .replaceAll("(", "")
                .replaceAll(")", "")}AiModelFile${index + 1}`,
              create_model(doc_data.slice(index * 50000))
            );
          }

          exec(
            `ollama create ${file.filename
              .replaceAll(" ", "")
              .split(".")[0]
              .replaceAll("(", "")
              .replaceAll(")", "")}AiModelFile${
              index + 1
            } -f models/${bankId}_${file.filename
              .replaceAll(" ", "")
              .split(".")[0]
              .replaceAll("(", "")
              .replaceAll(")", "")}AiModelFile${index + 1}`,
            (error: any, stdout: string, stderr: string) => {
              if (error) {
                console.error(error);
                return;
              }
              console.log(stdout);
            }
          );
        }
      } else {
        let res = fs.writeFileSync(
          `models/${bankId}_${file.filename
            .replaceAll(" ", "")
            .split(".")[0]
            .replaceAll("(", "")
            .replaceAll(")", "")}AiModelFile`,
          create_model(doc_data)
        );

        console.log(res);

        exec(
          `ollama create ${file.filename
            .replaceAll(" ", "")
            .split(".")[0]
            .replaceAll("(", "")
            .replaceAll(")", "")}AiModelFile -f models/${bankId}_${file.filename
            .replaceAll(" ", "")
            .split(".")[0]
            .replaceAll("(", "")
            .replaceAll(")", "")}AiModelFile`,
          (error: any, stdout: string, stderr: string) => {
            if (error) {
              console.error(error);
              return;
            }
            console.log(stdout);
          }
        );
      }

      // exec(
      //   `ollama create ${
      //     file.replaceAll(" ", "").split(".")[0]
      //   }AiModelFile -f models/${
      //     file.replaceAll(" ", "").split(".")[0]
      //   }AiModelFile`,
      //   (error: any, stdout: string, stderr: string) => {
      //     if (error) {
      //       console.error(error);
      //       return;
      //     }
      //     console.log(stdout);
      //   }
      // );

      // fs.appendFile("test_data.txt", doc_data, (err) => {
      //   if (err) {
      //     console.error(err);
      //     return;
      //   }
      //   console.log("The data was written to the file successfully.");
      // });
      // const data = fs.readFileSync("test_data.txt", "utf8");
      // const new_data = new Set(data.split("\n"));
      // fs.writeFileSync("test_data.txt", Array.from(new_data).join("\n"));
    });

    // await fs.readFile("test_data.txt", (err, data) => {
    //   if (!err) {
    //     console.log(err);
    //   } else {
    //     const new_data = new Set(data.toString().split("\n"));
    //     fs.writeFile(
    //       "test_data.txt",
    //       Array.from(new_data).join("\n"),
    //       (err) => {
    //         if (!err) {
    //           console.log("successfully written");
    //         }
    //       }
    //     );
    //   }
    // });
  } catch (error) {
    // console.log(error);
  }
};
