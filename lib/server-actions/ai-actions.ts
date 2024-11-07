"use server";
import { code } from "@/types";
import axios from "axios";
import fs from "fs";

async function processFilesSequentially(
  files: string[],
  code: code,
  previous_analysis: string
) {
  let analysis = "";
  for (const file of files) {
    try {
      const res = await axios.post("http://localhost:3000/api/ai/interface_testing", {
        model: `${file}:latest`,
        code: code,
        previous_analysis: previous_analysis ? previous_analysis : null,
        stream: false,
      });

      const data = res.data; // No need to await here since res.data is not a promise
      previous_analysis =
        ` Analysis : ` +
        data.response
          .replaceAll("\n", "")
          .slice(data.response.replaceAll("\n", "").indexOf("{"));
      // console.log("previous_analysis:", previous_analysis);
      analysis = data.response;
    } catch (error) {
      console.log(error);
    }
  }

  // console.log("final_analysis", analysis);
  return analysis;
}

const calculateResidualScore = (
  inherentRiskScore: string,
  mitigatingControlScore: string
) => {
  const inherentRisk = parseInt(inherentRiskScore);
  const mitigatingControl = parseInt(mitigatingControlScore);
  const residualRiskScore = inherentRisk - mitigatingControl;
  return residualRiskScore >= 0 ? residualRiskScore.toString() : "1";
};

const riskCategory = (inherentRiskScore: string) => {
  if (inherentRiskScore === "1") {
    return "Low";
  } else if (inherentRiskScore === "2") {
    return "Moderate";
  } else if (inherentRiskScore === "3") {
    return "High";
  }
};
export const getAnalysis = async (bankId: string, code: code) => {
  const files = fs.readdirSync("models");
  const filter_files = files.filter((file) => {
    return file.includes(bankId);
  });

  const final_files = filter_files.map((file) => {
    return file.replace(`${bankId}_`, "");
  });

  let previous_analysis: string = "";

  console.log("ANALYSING....");
  const res = await processFilesSequentially(
    final_files,
    code,
    previous_analysis
  );

  const inherentRiskScoreRegex = /inherent_risk_score:\s*(\d+)/;
  const inherentRiskScoreMatch = res.match(inherentRiskScoreRegex);
  const inherentRiskScore = inherentRiskScoreMatch
    ? inherentRiskScoreMatch[1]
    : null;

  // Extracting mitigating_control_score
  const mitigatingControlScoreRegex = /mitigating_control_score:\s*(\d+)/;
  const mitigatingControlScoreMatch = res.match(mitigatingControlScoreRegex);
  const mitigatingControlScore = mitigatingControlScoreMatch
    ? mitigatingControlScoreMatch[1]
    : null;

  // Extracting Document_used_for_analysis
  const documentUsedForAnalysisRegex = /Document_used_for_analysis:\s*([^,]+)/;
  const documentUsedForAnalysisMatch = res.match(documentUsedForAnalysisRegex);
  const documentUsedForAnalysis = documentUsedForAnalysisMatch
    ? documentUsedForAnalysisMatch[1].trim()
    : null;

  // Extracting Reasoning
  const reasoningRegex = /Reasoning:\s*([\s\S]+)/;
  const reasoningMatch = res.match(reasoningRegex);
  const reasoning = reasoningMatch ? reasoningMatch[1].trim() : null;

  console.log("Inherent Risk Score:", inherentRiskScore);
  console.log("Mitigating Control Score:", mitigatingControlScore);
  console.log("Document Used for Analysis:", documentUsedForAnalysis);
  console.log("Reasoning:", reasoning);

  const residualRiskScore =
    inherentRiskScore !== null && mitigatingControlScore !== null
      ? calculateResidualScore(inherentRiskScore, mitigatingControlScore)
      : null;
  return {
    inherentRiskCategory: inherentRiskScore
      ? riskCategory(inherentRiskScore)
      : null,
    inherentRiskScore: inherentRiskScore,
    mitigatingControl: mitigatingControlScore
      ? riskCategory(mitigatingControlScore)
      : null,
    mitigatingControlScore: mitigatingControlScore,
    documentUsedForAnalysis: documentUsedForAnalysis,
    residualRiskScore: residualRiskScore,
    residualRiskCategory: residualRiskScore
      ? riskCategory(residualRiskScore)
      : null,
    reasoning: reasoning,
  };
};
