"use server";
import { OllamaEmbeddings } from "langchain/embeddings/ollama";
import { FaissStore } from "@langchain/community/vectorstores/faiss";

export const embeddAndStoreData = async (
  // @ts-ignore docs type error
  docs: Document<Record<string, any>>[]
) => {
  console.log(docs[0]);
  const embeddings = new OllamaEmbeddings({
    model: "inherent:latest", // default value
    baseUrl: "http://localhost:11434", // default value
    requestOptions: {
      useMMap: true,
      numThread: 6,
    },
  });

  // embeddings.embedDocuments(docs).then((res) => {
  //   console.log(res);
  // });

  await FaissStore.fromDocuments(docs, embeddings).then((store) => {
    console.log("vector store is saving...");
    store.save("models/2920Ai_embeddings").then((res) => {
      console.log("Successfully saved!!");
    });
  });
};
