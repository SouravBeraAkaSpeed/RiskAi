"use server";
import { assesment } from "@/types";
import { db } from "@/lib/db";

export const addCodeAnalysis = async (data: assesment) => {
  try {
    const {
      code,
      comments,
      documentUsedForAnalysis,
      inherentRiskCategory,
      inherentRiskScore,
      mitigatingControl,
      mitigatingControlScore,
      residualRiskCategory,
      residualRiskScore,
      bankId,
    } = data;

    // Check if the bank exists
    const existingBank = await db.bank.findUnique({
      where: { id: bankId },
    });

    if (!existingBank) {
      throw new Error(`Bank with id ${bankId} does not exist.`);
    }

    // Check if the code is already associated with the bank
    const existingCodeAnalysis = await db.codeAnalysis.findFirst({
      where: {
        code: { equals: code },
        bankId: { equals: bankId },
      },
    });

    if (existingCodeAnalysis) {
      // Return a response indicating that the code is already associated
      console.log(
        `Code '${code}' is already associated with bankId '${bankId}'.`
      );
      return {
        message: `Code '${code}' is already associated with bankId '${bankId}'.`,
      };
    }

    // Create the code analysis entry
    const response = await db.codeAnalysis.create({
      data: {
        code,
        comments,
        documentUsedForAnalysis,
        inherentRiskCategory,
        inherentRiskScore,
        mitigatingControl,
        mitigatingControlScore,
        residualRiskCategory,
        residualRiskScore,
        bank: {
          connect: {
            id: bankId,
          },
        },
      },
    });

    if (response) {
      console.log("Code analysis added successfully.");
      return response;
    } else {
      console.log("Error in addCodeAnalysis");
      return null;
    }
  } catch (error: any) {
    console.error(`Error adding code analysis: ${error.message}`);
    return null;
  }
};
