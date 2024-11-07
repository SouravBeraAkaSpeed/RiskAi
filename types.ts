export type assesment = {
  code: string;
  comments: string;
  documentUsedForAnalysis: string;
  inherentRiskCategory: string;
  inherentRiskScore: number;
  mitigatingControl: string;
  mitigatingControlScore: number;
  residualRiskCategory: string;
  residualRiskScore: number;
  bankId: string;
};

export type code = {
  code: string;
  riskCategory: string;
  lowRisk: string;
  moderateRisk: string;
  highRisk: string;
  subclasses?: [subcode];
};

export type subcode = {
  subcode: string;
  category: string;
  strong: string;
  adequate: string;
  weak: string;
  score: number;
  comments: string;
  documents: string;
};

export type codeAnalyses = [assesment];

export type bank = {
  id: string;
  name: string;
  address: string;
  codes: codes;
  codeAnalyses: codeAnalyses;
};

export type customers = {
  id: string;
  name: string;
  address: string;
  createdAt: string;
  updatedAt: string;
};

export type codes = [code];
