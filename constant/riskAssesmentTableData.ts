export const table_content = [
  {
    code: "CB",
    risk_category: "Customer Base",
    low_risk:
      "Stable homogenous community bank, customers are predominately consumers.",
    moderate_risk:
      "Customer base increasing due to branching, merger, or acquisition. Customer base is regional.",
    high_risk:
      "Customer base derived from doing business in high risk geographic locations (domestic and foreign) or a diverse metropolitan area.",
    sub_category_content: [
      {
        code: "CB-1",
        category: "Policy/Procedures",
        strong:
          "Policy / Procedures are thorough, detailed and updated as necessary to reflect changes to the bank’s customer base.",
        adequate:
          "Policy / Procedures are adequate however, have not been updated to reflect changes to the bank’s customer base.",
        weak: "Policy / Procedures do not exist or are significantly incomplete. ",
        score: "2",
        comments: "",
        documents: "",
      },
      {
        code: "CB-2",
        category: "CIP Documentary / Non-Documentary Verification",
        strong:
          "The CIP verification process adequately verifies customers within a reasonable time after account opening. The process is well- tracked and exceptions are followed up in a timely manner. ",
        adequate:
          "The CIP verification process is adequate, yet the exception process is poorly tracked and follow-up is not conducted in a timely manner. Exception process is poorly tracked and follow up is not timely.",
        weak: "The CIP verification process does not allow for verification of customers within a reasonable time. ",
        score: "1",
        comments: "",
        documents: "",
      },
    ],
  },
  {
    code: "NRA",
    risk_category: "NRA Customers",
    low_risk: "The institution does not have any NRA accounts.",
    moderate_risk:
      "Moderate level of NRA accounts from lower- risk geographies.",
    high_risk:
      "Significant number of NRA accounts from higher-risk geographies.",
    sub_category_content: [
      {
        code: "NRA-1",
        category: "Overseas Verification Controls",
        strong:
          "Procedures for account witnessing with overseas verification is thorough and detailed. Local approval is required prior to account opening.",
        adequate:
          "Procedures are adequate, however, they have not been updated to reflect the risk posed by account witnessed with overseas verification. Approval is not required by the BSA Team prior to account opening.",
        weak: "Procedures for account witnessing with overseas verification do not exist.",
        score: "1",
        comments: "",
        documents: "",
      },
    ],
  },
];

export const table_header = [
  "Code",
  "Risk Category",
  "Low Risk",
  "Moderate Risk",
  "High Risk",
  "Inherent Risk",
  "Inherent Risk Score",
  // "Migrating Control",
  // "Migrating Control Score",
  // "Residual Risk",
  "Document Used for Analysis",
  "Comments",
];

export const cbCode = {
  code: "CB",
  riskCategory: "Customer Base",
  lowRisk:
    "Stable homogenous community bank, customers are predominately consumers.",
  moderateRisk:
    "Customer base increasing due to branching, merger, or acquisition. Customer base is regional.",
  highRisk:
    "Customer base derived from doing business in high risk geographic locations (domestic and foreign) or a diverse metropolitan area.",
};

export const nraCode = {
  code: "NRA",
  riskCategory: "NRA Customers",
  lowRisk: "The institution does not have any NRA accounts.",
  moderateRisk: "Moderate level of NRA accounts from lower- risk geographies.",
  highRisk: "Significant number of NRA accounts from higher-risk geographies.",
};

export const codes = [
  {
    code: "CB",
    riskCategory: "Customer Base",
    lowRisk:
      "Stable homogenous community bank, customers are predominately consumers.",
    moderateRisk:
      "Customer base increasing due to branching, merger, or acquisition.  Customer base is regional.",
    highRisk:
      "Customer base derived from doing business in  high risk geographic locations (domestic and foreign) or a diverse metropolitan area.",
    subcodes: [
      {
        subcode: "CB-1",
        category: "Policy / Procedures",
        strong:
          "Policy / Procedures are thorough, detailed and updated as necessary to reflect changes to the bank\u2019s customer base.  ",
        adequate:
          "Policy / Procedures are adequate however, have not been updated to reflect changes to the bank\u2019s customer base.  ",
        weak: "Policy / Procedures do not exist or are significantly incomplete. ",
      },
      {
        subcode: "CB-2",
        category: "CIP Documentary / Non-Documentary Verification",
        strong:
          "The CIP verification process adequately verifies customers within a reasonable time after account opening. The process is well- tracked and exceptions are followed up in a timely manner.  ",
        adequate:
          "The CIP verification process is adequate, yet the exception process is poorly tracked and follow-up is not conducted in a timely manner. Exception process is poorly tracked and follow up is not timely.",
        weak: "The CIP verification process does not allow for verification of customers within a reasonable time. ",
      },
      {
        subcode: "CB-3",
        category: "Know Your Customer ",
        strong: "The KYC procedures are commensurate with the risk posed.  ",
        adequate:
          "KYC procedures exist but need strengthening given the risk posed by business products, services and customers. ",
        weak: "KYC procedures do not exist or exist but are incomplete. ",
      },
      {
        subcode: "CB-4",
        category: "Enhanced Due Diligence",
        strong:
          "The bank has automated processes to identify high-risk customers at account opening. The information is communicated to the front line. ",
        adequate:
          "The bank has a limited, cumbersome and manual high-risk customer identification process. ",
        weak: "No process to identify high-risk customers at account opening. ",
      },
      {
        subcode: "CB-5",
        category: "Training",
        strong: "All appropriate staff receives CIP  training annually. ",
        adequate:
          "Most staff receives CIP training however tracking is ineffective to identify possible gaps.",
        weak: "Staff does not receive CIP training and there is no tracking mechanism. ",
      },
      {
        subcode: "CB-5",
        category: "Fraud Detection",
        strong:
          "A mostly automated fraud monitoring system to address electronic banking products. ",
        adequate:
          "Mostly manual fraud monitoring is conducted to identify fraudulent activity in electronic banking products.   ",
        weak: "No fraudulent activity monitoring of electronic banking products exist. ",
      },
      {
        subcode: "CB-6",
        category: "Record Retention",
        strong:
          "Records are maintained in accordance with applicable laws and regulations.",
        adequate: "Records are generally available but may be incomplete. ",
        weak: "There is no formal record retention policy. ",
      },
      {
        subcode: "CB-7",
        category: "Risk Rating System",
        strong: "The bank maintains an automated risk rating system.",
        adequate: "The bank maintains a manual risk rating system.",
        weak: "The bank does not have a risk rating system. ",
      },
      {
        subcode: "CB-8",
        category: "Special Measures",
        strong:
          "The bank has procedures in place to comply with Section 311 of the USA PATRIOT Act which governs special measures.",
        adequate:
          "The bank has procedures in place to comply with Section 311 of the USA PATRIOT Act, however, the procedures need strengthening. ",
        weak: "The bank does not have procedures in place to comply with Section 311 of the USA PATRIOT Act which governs special measures.",
      },
      {
        subcode: "CB-9",
        category: "PEP Screening",
        strong:
          "There is an automated process for PEP screening at onboarding and continuous screening.",
        adequate:
          "There is a highly manual process for PEP screening at onboarding and continuous screening is not available. ",
        weak: "There is no process for PEP screening. ",
      },
      {
        subcode: "CB-10",
        category: "Suspicious Activity Detection",
        strong:
          "Mostly automated suspicious activity monitoring system to monitor customer accounts.",
        adequate:
          "Mostly manual monitoring is conducted to identify suspicious activity to monitor customer accounts. ",
        weak: "No suspicious activity monitoring of customers referred by deposit brokers.  ",
      },
      {
        subcode: "CB-11",
        category: "Fraud Detection",
        strong:
          "The bank has a comprehensive automated monitoring system to detect fraud in transaction interfaces (teller activity, checks processing, electronic banking, ACH). ",
        adequate:
          "The bank has a less comprehensive automated monitoring system to detect fraud in some transaction interfaces (teller activity, checks processing, electronic banking, ACH). ",
        weak: "The bank does not have an automated monitoring system to detect fraud.  ",
      },
      {
        subcode: "CB-12",
        category: "3rd Party Reliance",
        strong: "The bank does not rely on third parties to perform CIP.",
        adequate:
          "The bank does rely on 3rd parties, however, due diligence was performed and adequate procedures are maintained.",
        weak: "The bank relies on third parties to perform CIP and has not performed due diligence on those parties. ",
      },
      {
        subcode: "CB-13",
        category: "Customer Termination",
        strong:
          "Management agrees to all customer termination requests from the BSA Officer.",
        adequate:
          "Management agrees to BSA Officer requests; however, there are instances when management has requested exceptions and received CEO approval.  ",
        weak: "Management has disagreed with the BSA Officer request for customer termination and failed to provide a reasonable explanation, which the CEO approved. ",
      },
      {
        subcode: "CBW-1",
        category: "Policies & Procedures",
        strong:
          "Policies and procedures have been developed to manage risks posed by cross border remittances. ",
        adequate:
          "Policies and procedures for exist to manage risk posed by cross border remittances; however, they must be strengthened. ",
        weak: "No policies and procedures exist for to manage cross border remittances. ",
      },
      {
        subcode: "CBW-2",
        category: "Suspicious Activity Detection",
        strong:
          "Mostly automated suspicious activity monitoring system to address wire transfers. .   ",
        adequate:
          "Mostly manual monitoring is conducted to identify suspicious activity in wire transfers. ",
        weak: "No suspicious activity monitoring of wire transfers exists. ",
      },
      {
        subcode: "CBW-3",
        category: "Third Party Remittances From China / Underground Remitters",
        strong:
          "A formal suspicious activity escalation process and wires are monitored by the Bank's automated transaction monitoring system. ",
        adequate:
          "An informal suspicious activity escalation process exists and wires are monitored by the Bank's automated transaction monitoring system.  ",
        weak: "No suspicious activity process exists and wires are not monitored by the Bank's automated transaction monitoring system. . ",
      },
    ],
  },
  {
    code: "NRA",
    riskCategory: "NRA customers",
    lowRisk: "The institution does not have any NRA accounts",
    moderateRisk: "Moderate level of NRA accounts from lower- risk geographies",
    highRisk: "Significant number of NRA accounts from higher-risk geographies",
    subcodes: [
      {
        subcode: "NRA-1",
        category: "Overseas Verification Controls",
        strong:
          "Procedures for account witnessing with overseas verification is thorough and detailed. Local approval is required prior to account opening.    ",
        adequate:
          "Procedures are adequate, however, they have not been updated to reflect the risk posed by account witnessed with overseas verification. Approval is not required by the BSA Team prior to account opening. ",
        weak: "Procedures for account witnessing with overseas verification do not exist.",
      },
    ],
  },
  {
    code: "IA",
    riskCategory: "International accounts",
    lowRisk:
      "Few international accounts or very low volume of currency activity in the accounts.",
    moderateRisk:
      "Moderate level of international accounts with unexplained currency activity.",
    highRisk:
      "Large number of international accounts with unexplained currency activity.",
    subcodes: [
      {
        subcode: "IA-1",
        category: "Policies & Procedures",
        strong:
          "Policies and procedures have been developed to manage risks posed by international accounts.",
        adequate:
          "Policies and procedures exist to manage risk posed by international accounts; however, they must be strengthened. ",
        weak: "No policies and procedures exist to manage the risks associated by international accounts. ",
      },
    ],
  },
  {
    code: "EM",
    riskCategory: "Embassy, Consulate & Mission Accounts",
    lowRisk:
      "The institution does not have any Embassy Consulate or Mission accounts. ",
    moderateRisk:
      "Moderate level of Embassy Consulate or Mission accounts.  Accounts. ",
    highRisk:
      "Significant number of Embassy Consulate & Mission accounts from medium and high risk geographies",
    subcodes: [
      {
        subcode: "EM-1",
        category: "Policies & Procedures",
        strong:
          "Policies and procedures have been developed to manage risks posed by embassy and consulate accounts. ",
        adequate:
          "Policies and procedures for exist to manage risk posed by consulate and embassy accounts; however, they must be strengthened. ",
        weak: "No policies and procedures exist to manage the risks associated by consulate and embassy accounts. ",
      },
    ],
  },
  {
    code: "BD",
    riskCategory: "Brokered deposits",
    lowRisk: "The institution does not have any brokered deposits",
    moderateRisk:
      "Moderate level of brokered deposits from a few well known low risk brokers. ",
    highRisk:
      "Large amount of brokered deposits from a wide variety of brokers, some of which are not well known to bank\nand offers other high risk services such as establishing shell companies in high risk geographies.",
    subcodes: [
      {
        subcode: "BD-1",
        category: "Policies & Procedures",
        strong:
          "Policies and procedures have been developed to manage risks posed by deposit brokers.     ",
        adequate:
          "Policies and procedures for exist to manage risk posed by deposit brokers; however, they must be strengthened. ",
        weak: "No policies and procedures exist for to manage risks posed deposit brokers.   ",
      },
    ],
  },
  {
    code: "MSB",
    riskCategory: "MSBs & Other Nonbank FI",
    lowRisk:
      "The institution does not have any relationships with non-bank financial institutions (NBFIs) or MSBs. ",
    moderateRisk:
      "The institution maintains relationships with a  few NBFIs and ONLY registered MSBs or agents of MSBs.",
    highRisk:
      "The institution maintains relationships with a large number of NBFIs, including unregistered and foreign NBFIs. ",
    subcodes: [
      {
        subcode: "MSB-1",
        category: "Policies & Procedures",
        strong:
          "Policies and procedures have been developed to manage risks posed by MSB and NBFI customers.",
        adequate:
          "Policies and procedures for exist to manage risk posed by MSB and NBFI customers; however, they must be strengthened. ",
        weak: "No policies and procedures exist for to manage MSB and NBFI customers",
      },
    ],
  },
  {
    code: "TP",
    riskCategory: "Third party payment processors",
    lowRisk:
      "The institution does not maintain accounts for Third Party Payment Processors (customers that use their commercial deposit account at the institution to provide payment-processing services to merchants and other business entities).",
    moderateRisk:
      "The institution maintains accounts for Third Party Payment Processors and is able to identify and understand the nature and source of the transactions processed through the account and has  policies that require the institution to authenticate the processor\u2019s business operations and assess their risk level.",
    highRisk:
      "The institution maintains accounts for Third Party Payment Processors and/or is NOT able to identify and understand the nature and source of the transactions processed through the account and does NOT have policies that require the institution to authenticate the processor\u2019s business operations and assess their risk level.",
    subcodes: [
      {
        subcode: "TP-1",
        category: "Policies & Procedures",
        strong:
          "Policies and procedures have been developed to manage risks posed by TPPPs. ",
        adequate:
          "Policies and procedures for exist to manage risk posed by TPPPs; however, they must be strengthened. ",
        weak: "No policies and procedures exist for to manage TPPPs. ",
      },
    ],
  },
  {
    code: "IG",
    riskCategory: "Internet gambling",
    lowRisk:
      "The institution does not do business with customers engaged in Internet Gambling by policy and obtains verification from all commercial customers that no Internet gambling business transactions will be conducted.\n",
    moderateRisk:
      "Minimal number of Internet gambling business customers with legal documentation and verification by all other commercial customers that no Internet gambling business transactions are conducted.",
    highRisk:
      "Institution's account opening procedures do not include certifying that commercial customers are not going to engage in Internet Gambling. ",
    subcodes: [
      {
        subcode: "IG-1",
        category: "Policies & Procedures",
        strong:
          "Policies and procedures have been developed to manage risks posed by TPPPs. ",
        adequate:
          "Policies and procedures for exist to manage risk posed by TPPPs; however, they must be strengthened. ",
        weak: "No policies and procedures exist for to manage TPPPs. ",
      },
    ],
  },
  {
    code: "HR",
    riskCategory: "High risk customers",
    lowRisk:
      "Few high-risk customers and businesses and institution has developed a customer risk rating process.",
    moderateRisk:
      "A moderate number of high-risk customers and businesses (e.g., check cashers, convenience stores, wire remitters, casa de cambio, import/export companies, offshore corporations, politically exposed persons (PEPs), non-resident aliens, and foreign customers, and customers maintaining privately-owned ATMs)",
    highRisk:
      "A high number of high-risk customers and businesses (e.g., check cashers, convenience stores, wire remitters, cases de cambio, import/export companies, offshore corporations, PEPs, non-resident aliens, and foreign customers) or the institution has not developed a Customer Risk-Rating Process. ",
    subcodes: [
      {
        subcode: "HR-1",
        category: "CIP Policy / Procedures",
        strong:
          "CIP Policy/Procedures are thorough, detailed and updated as necessary to reflect changes to the bank\u2019s high customer base.  The CIP process verifies customers within reasonable time after account opening. The process is well tracked and exceptions are followed up on in a timely manner. ",
        adequate:
          "CIP Policy/Procedures are adequate however, have not been updated to reflect changes to the bank\u2019s high customer base.  Exception process is poorly tracked and follow up is not timely.",
        weak: "CIP Policy/Procedures do not exist or are significantly incomplete. ",
      },
      {
        subcode: "HR-2",
        category: "Know Your Customer ",
        strong:
          "The KYC procedures are commensurate with the risk posed by high risk customers.   ",
        adequate:
          "KYC procedures exist but need strengthening given the risk posed by high risk customers. ",
        weak: "KYC procedures do not exist or exist but are incomplete. ",
      },
      {
        subcode: "HRL-1",
        category: "Policies & Procedures",
        strong:
          "Policies and procedures for loan customers have been developed to manage risks posed by higher risk loan customers.  ",
        adequate:
          "Policies and procedures for loan customers exist to manage risk posed by higher risk loan customers, however, however, they must be strengthened. ",
        weak: "No policies and procedures exist for loan customers.  ",
      },
    ],
  },
  {
    code: "HRL",
    riskCategory: "High risk customers - loans",
    lowRisk:
      "Consumer, commercial, and credit card loans are offered to U.S. citizens only;  No loans secured by cash collateral.",
    moderateRisk:
      "Consumer, commercial, and credit card loans are offered to both U.S. citizens and a small number of non-resident aliens.   Few loans secured by cash collateral.",
    highRisk:
      "Consumer, commercial and credit card loans are offered to both U.S. citizens and a high number of non-resident aliens or persons outside the US, particularly those located in high risk jurisdictions.  Possibly a high number of loans with collateral located outside the US or significant amount of loans secured by cash collateral.",
    subcodes: [
      {
        subcode: "HRL-1",
        category: "Policies & Procedures",
        strong:
          "Policies and procedures for loan customers have been developed to manage risks posed by higher risk loan customers.  ",
        adequate:
          "Policies and procedures for loan customers exist to manage risk posed by higher risk loan customers, however, however, they must be strengthened. ",
        weak: "No policies and procedures exist for loan customers.  ",
      },
    ],
  },
  {
    code: "EB",
    riskCategory: "Electronic banking",
    lowRisk:
      "Traditional Deposit and Non-Deposit Account Services are offered in person only; these consist of Time Deposits, Savings Deposits, and Transaction Accounts.  ATM cards issued to consumers only. No electronic banking (e-banking) or the web site is informational/non-transactional.",
    moderateRisk:
      "The institution offers ATM/Debit cards to business customers and limited e-banking products and services (i.e., account transfers, bill payment), accounts opened via internet with prior face to face relationship.)",
    highRisk:
      "The institution offers a wide array of e-banking products and services (i.e., account transfers, e-bill payment, Remote Deposit Capture, Accounts opened via Internet without prior relationship)",
    subcodes: [
      {
        subcode: "EB-1",
        category: "Customers",
        strong:
          "Electronic banking products or services are only available to bank customers and subject to applicable customer controls. ",
        adequate:
          "Certain low risk electronic banking products or services are available to non-customers who are not subject to applicable customer controls.",
        weak: "Electronic banking products or services are available to non-customers who are not subject to applicable customer controls.",
      },
      {
        subcode: "EB-2",
        category: "Policies & Procedures",
        strong:
          "Policies and procedures for electronic banking have been developed to manage risks posed by higher risk electronic banking products and services. ",
        adequate:
          "Policies and procedures for electronic banking exist to manage risk posed by higher risk electronic banking products and services, however, they must be strengthened. ",
        weak: "No policies and procedures exist for electronic banking. ",
      },
    ],
  },
  {
    code: "SV",
    riskCategory: "Prepaid Access",
    lowRisk:
      "The Institution does not offer electronic cash (e-cash) or prepaid or stored value cards. ",
    moderateRisk:
      "The institution sells a moderate number of e-cash products or prepaid or stored value cards, but with restrictions (i.e. limits on loads/transactions, controls on number cards purchased)\n",
    highRisk:
      "The institution sells a moderate number of e-cash products or prepaid or stored value cards, but with restrictions (i.e. limits on loads/transactions, controls on number cards purchased)\n",
    subcodes: [
      {
        subcode: "SV-1",
        category: "Policies & Procedures",
        strong:
          "Policies and procedures have been developed to manage risks posed by e-cash and store value cards. ",
        adequate:
          "Policies and procedures have been developed to manage risks posed by e-cash and store value cards, however, they must be strengthened. ",
        weak: "Policies and procedures have not been developed to manage risks posed by e-cash and store value cards.  ",
      },
    ],
  },
  {
    code: "CI",
    riskCategory: "Cash intensive businesses",
    lowRisk: "There are few or no large currency or structured transactions.",
    moderateRisk:
      "There is a moderate volume of large currency or structured transactions and only conducted by domestic customers.\n",
    highRisk:
      "There is a significant  volume of large currency or structured transactions.  \n",
    subcodes: [
      {
        subcode: "CI-1",
        category: "Suspicious Activity Detection",
        strong:
          "Mostly automated suspicious activity monitoring system to address cash products.   ",
        adequate:
          "Mostly manual monitoring is conducted to identify suspicious activity in electronic banking products.   ",
        weak: "No suspicious activity monitoring of electronic banking products exist. ",
      },
    ],
  },
  {
    code: "CTR",
    riskCategory: "CTR filings",
    lowRisk:
      "Relative to the overall customer base there are few or no CTR filings. ",
    moderateRisk:
      "Relative to the overall customer based there is a moderate volume of CTR filings. ",
    highRisk:
      "Relative to the overall customer based there is a significant volume of CTR filings. ",
    subcodes: [
      {
        subcode: "CTR-1",
        category: "CTR Filing",
        strong:
          "CTR filing process is centralized in the compliance function or de-centralized with uniform and consistent procedures. .  ",
        adequate:
          "CTR filing process is not centralized rather each branch files own CTR and there are no uniform filing procedures.    ",
        weak: "CTR filing process is ad-hoc or non-existent. ",
      },
      {
        subcode: "CTR-2",
        category: "CTR Quality ",
        strong:
          "Low volume of correspondence from FINCEN indicates that CTRs are accurate.",
        adequate:
          "Volume of correspondence from the FINCEN indicates some errors in CTR reporting.",
        weak: "Volume of correspondence from FINCEN indicates a substantive volume of CTR reporting errors.",
      },
      {
        subcode: "CTR-3",
        category: "CTR Exemptions",
        strong:
          "Low number of CTR customers relative to the overall customer base.",
        adequate:
          "Moderate number of CTR exempt customers relative to the overall customer based.",
        weak: "High number of CTR exempt customer relatives to the overall customer base.",
      },
    ],
  },
  {
    code: "LC",
    riskCategory: "Letters of credit",
    lowRisk:
      "The institution does not have any trade financing relationships. ",
    moderateRisk:
      "The institution has a few trade financing relationships, consisting mostly of domestic Letters of Credit. .  ",
    highRisk:
      "The institution has a large number of trade financing relationships, including foreign Letters of Credit from international high-risk jurisdictions. ",
    subcodes: [
      {
        subcode: "LC-1",
        category: "Customer Base / Credit Issuance ",
        strong:
          "Letters of Credit import issuance are only available to bank customers and subject to applicable customer controls. ",
        adequate:
          "Letters of Credit import issuance is available to non-customers who are not subject to applicable customer controls, however, a risk assessment was performed and specific controls were implemented.",
        weak: "Letters of Credit import issuance are available to non-customers who are not subject to applicable customer controls.",
      },
      {
        subcode: "LC-2",
        category: "Policies & Procedures",
        strong:
          "Policies and procedures have been developed to manage risks posed by letters of credit.    ",
        adequate:
          "Policies and procedures for exist to manage risk posed by letters of credit, however, they must be strengthened. ",
        weak: "No policies and procedures exist for to manage risks posed by letters of credit.  ",
      },
      {
        subcode: "LC-3",
        category: "Suspicious Activity Detection",
        strong:
          "Mostly automated suspicious activity monitoring system to address letters of credit.    ",
        adequate:
          "Mostly manual monitoring is conducted to identify suspicious activity in letters of credit. ",
        weak: "No suspicious activity monitoring of letters of credit.  ",
      },
      {
        subcode: "LC-4",
        category: "High Risk Country Report",
        strong:
          "High risk country report is produced, used by AML transaction monitoring system and distributed to all appropriate staff to identity and mitigate geographical risk exposures within the business.  ",
        adequate:
          "High risk country report has been produced but is not fully utilized by the AML transaction monitoring system, nor, is the analysis of high risk countries used by staff to identify and mitigate geographical risk exposures within the business. ",
        weak: "High risk country report has not been developed.",
      },
    ],
  },
  {
    code: "CO",
    riskCategory: "Other Trade Services (Collections & Collection Financing) ",
    lowRisk:
      "The institution does not have any trade financing relationships. ",
    moderateRisk:
      "The institution has a few trade financing relationships, consisting mostly of domestic Letters of Credit. .  ",
    highRisk:
      "The institution has a large number of trade financing relationships, including foreign Letters of Credit from international high-risk jurisdictions. ",
    subcodes: [
      {
        subcode: "CO-1",
        category: "Policies & Procedures",
        strong:
          "Policies and procedures have been developed to manage risks posed by inward, outward collection and short term financing. ",
        adequate:
          "Policies and procedures for exist to manage risk posed by inward, outward collection and short term financing, however, they must be strengthened. ",
        weak: "No policies and procedures exist for to manage risks posed by inward, outward collection and short term financing.  ",
      },
      {
        subcode: "CO-2",
        category: "Suspicious Activity Detection",
        strong: "Mostly automated suspicious activity monitoring system.",
        adequate:
          "Mostly manual monitoring is conducted to identify suspicious activity. ",
        weak: "No suspicious activity monitoring.",
      },
      {
        subcode: "CO-3",
        category: "High Risk Country Report",
        strong:
          "High risk country report is produced, used by AML transaction monitoring system and distributed to all appropriate staff to identity and mitigate geographical risk exposures within the business.  ",
        adequate:
          "High risk country report has been produced but is not fully utilized by the AML transaction monitoring system, nor, is the analysis of high risk countries used by staff to identify and mitigate geographical risk exposures within the business. ",
        weak: "High risk country report has not been developed.",
      },
    ],
  },
  {
    code: "FC",
    riskCategory:
      "Foreign correspondent accounts pouch activities & currency shipments",
    lowRisk:
      "No foreign correspondent bank accounts.  The institution does not engage in pouch activities, offer special use or payable through accounts (PTAs), or provide U.S. dollar draft services or engage in Bulk Currency Shipment.",
    moderateRisk:
      "The institution has a few foreign correspondent bank accounts, but typically with low-risk countries, and minimal pouch activities, special use or PTAs,  U.S. dollar draft services or Bulk Currency Shipment relationships for customers not located in High Risk Geographies.",
    highRisk:
      "The institution maintains a large number of foreign correspondent bank accounts, particularly located in high-risk jurisdictions, or offers substantial pouch activities, special use or PTAs,  U.S. dollar draft services or Bulk Currency Shipment relationships, including customers located in High Risk Geographies.",
    subcodes: [
      {
        subcode: "FC-1",
        category: "Foreign Correspondent Accounts",
        strong:
          "Policies and procedures have been developed to manage risks posed by foreign correspondent accounts.  ",
        adequate:
          "Policies and procedures have been developed to manage risks posed by foreign correspondent accounts, however, they must be strengthened. ",
        weak: "No policies and procedures have been developed to manage risks posed by foreign correspondent accounts. ",
      },
    ],
  },
  {
    code: "FBAR",
    riskCategory: "FBAR",
    lowRisk:
      "The institution does not have a financial interest in, or signature or other authority over, bank, securities, or other financial accounts in a foreign country and the institution is not required to file a Report of Foreign Bank and Financial Accounts (FBAR) for customer accounts, including trust accounts, in which the bank has a financial interest or over which it has signature or other authority.",
    moderateRisk:
      "The institution has a few accounts which financial interest in, or signature or other authority over, bank, securities, or other financial accounts in a foreign country and the institution is not required to file a Report of Foreign Bank and Financial Accounts (FBAR) for a few customer accounts, including trust accounts, in which the bank has a financial interest or over which it has signature or other authority.",
    highRisk:
      "The institution has a financial interest in, or signature or other authority over, bank, securities, or other financial accounts in a foreign country and the institution is not required to file a Report of Foreign Bank and Financial Accounts (FBAR) for a large number of customer accounts, including trust accounts, in which the bank has a financial interest or over which it has signature or other authority.",
    subcodes: [
      {
        subcode: "FBAR-1",
        category: "Foreign Bank and Financial Accounts",
        strong:
          "The bank has policies to require at least two persons of comparatively senior level to open accounts at foreign institutions, limits the authorized signers to such accounts to employees of appropriate level and responsibility to have such authority, prohibits their use by other parties and requires regular reconciliation by persons with no other involvement with the accounts. ",
        adequate:
          "The bank has policies regarding the opening, maintenance and regular reconciliation of its accounts with foreign institutions but the policies would benefit from enhancement",
        weak: "The bank does not have policies regarding the opening, maintenance and regular reconciliation of its accounts with foreign institutions.",
      },
    ],
  },
  {
    code: "P",
    riskCategory: "Pouch Activities",
    lowRisk:
      "No foreign correspondent bank accounts.  The institution does not engage in pouch activities, offer special use or payable through accounts (PTAs), or provide U.S. dollar draft services or engage in Bulk Currency Shipment.",
    moderateRisk:
      "The institution has a few foreign correspondent bank accounts, but typically with low-risk countries, and minimal pouch activities.",
    highRisk:
      "The institution maintains a large number of foreign correspondent bank accounts, particularly located in high-risk jurisdictions, or offers substantial pouch activities.",
    subcodes: [
      {
        subcode: "TP-1",
        category: "Policies & Procedures",
        strong:
          "Policies and procedures have been developed to manage risks posed by TPPPs. ",
        adequate:
          "Policies and procedures for exist to manage risk posed by TPPPs; however, they must be strengthened. ",
        weak: "No policies and procedures exist for to manage TPPPs. ",
      },
      {
        subcode: "P-1",
        category: "Currency Shipments",
        strong: "The Bank does not accept currency shipments from customers.",
        adequate:
          "The Bank accepts currency shipments from customers, however, has limited its use and has implemented appropriate policies and procedures. ",
        weak: "The Bank accepts currency shipments from .high risk customers or customers in high risk geographic regions. ",
      },
      {
        subcode: "P-2",
        category: "Pouch Activities",
        strong: "The bank does not offer pouch services to customers.",
        adequate:
          "The bank offers pouch services, however, has limited its use and has implemented appropriate policies and procedures. ",
        weak: "The bank offers pouch services to high risk customers or customers in high risk geographic regions. ",
      },
      {
        subcode: "PB-1",
        category: "Policies & Procedures",
        strong:
          "Policies and procedures have been developed to manage risks posed by the type of private banking services offered. ",
        adequate:
          "Policies and procedures have been developed to manage risks posed by the type of private banking services offered, however, they must be strengthened. ",
        weak: "No policies and procedures have been developed to manage risks posed by the type of private banking services offered. ",
      },
      {
        subcode: "NP-1",
        category: "New Products / Services",
        strong:
          "The bank has a formal process and committee to introduce new products and services. The formal  BSA risk assessment performed by senior level officer or the BSA Officer.   ",
        adequate:
          "The bank has a formal process and committee to introduce new products and services. However, the formal process does not include a formal BSA/AML risk assessment.  ",
        weak: "The bank does not have a formal process and committee to introduce new products and services. ",
      },
    ],
  },
  {
    code: "PB",
    riskCategory: "Private banking",
    lowRisk:
      "The institution does not have a trust department or provide private banking services.",
    moderateRisk:
      "The institution offers limited domestic private banking services and has a trust department that offers accounts that are predominantly institution-controlled. ",
    highRisk:
      "Significant domestic and international private banking and trust activities. Private banking or trust department is growing. Products offered include investment management services, and trust accounts are predominantly customer controlled verses institution controlled accounts.",
    subcodes: [
      {
        subcode: "PB-1",
        category: "Policies & Procedures",
        strong:
          "Policies and procedures have been developed to manage risks posed by the type of private banking services offered. ",
        adequate:
          "Policies and procedures have been developed to manage risks posed by the type of private banking services offered, however, they must be strengthened. ",
        weak: "No policies and procedures have been developed to manage risks posed by the type of private banking services offered. ",
      },
    ],
  },
  {
    code: "ND",
    riskCategory: "NDIP & insurance",
    lowRisk:
      'The institution does not offer Non-Deposit Investment (NDIP) or Insurance products. (Leasing the bank\u2019s lobby space to a financial services corporation to sell NDIPs as long as the third party clearly differentiates itself from the bank is not considered "offering" a product)',
    moderateRisk:
      "Moderate level of traditional NDIP and insurance services with low risk regional partner prohibiting offshore accounts, agency accounts, and unidentified beneficiaries.",
    highRisk:
      "The institution offers no deposit investment products (NDIP) and insurance involving complex legal arrangements, rapidly\nmoving large dollars, and portfolios controlled directly by clients. ",
    subcodes: [
      {
        subcode: "ND-1",
        category: "Policies & Procedures",
        strong:
          "Policies and procedures have been developed to manage risks posed by NDIP and Insurance customers.    ",
        adequate:
          "Policies and procedures for exist to manage risk posed by NDIP and Insurance customers. however, they must be strengthened. ",
        weak: "No policies and procedures exist for to manage risks posed by NDIP and Insurance customers.",
      },
    ],
  },
  {
    code: "FT",
    riskCategory: "Funds transfers - domestic",
    lowRisk:
      "Limited number of funds transfers for customers and no international funds transfers.",
    moderateRisk:
      "A moderate number of funds transfers including non customers. A few international funds transfers from personal or business accounts with typically low-risk countries.",
    highRisk:
      "A high number of non-customer funds transactions and payable upon proper identification (PUPID) activity. Frequent funds from personal or business accounts to/from high-risk jurisdictions, financial secrecy havens or jurisdictions that are uncooperative in the fight against money laundering. Remittance services offered.",
    subcodes: [
      {
        subcode: "FT-1",
        category: "Policies & Procedures",
        strong:
          "Policies and procedures have been developed to manage risks posed by fund transfers.   ",
        adequate:
          "Policies and procedures for exist to manage risk posed by funds transfers; however, they must be strengthened. ",
        weak: "No policies and procedures exist for to manage funds transfers. ",
      },
      {
        subcode: "FT-2",
        category: "Suspicious Activity Detection",
        strong:
          "Mostly automated suspicious activity monitoring system to address wire transfers. .   ",
        adequate:
          "Mostly manual monitoring is conducted to identify suspicious activity in wire transfers. ",
        weak: "No suspicious activity monitoring of wire transfers exists. ",
      },
    ],
  },
  {
    code: "CBW",
    riskCategory: "Funds transfers - foreign",
    lowRisk:
      "Limited number of funds transfers for customers and no international funds transfers.",
    moderateRisk:
      "A moderate number of funds transfers including non customers. A few international funds transfers from personal or business accounts with typically low-risk countries.",
    highRisk:
      "A high number of non-customer funds transactions and payable upon proper identification (PUPID) activity. Frequent funds from personal or business accounts to/from high-risk jurisdictions, financial secrecy havens or jurisdictions that are uncooperative in the fight against money laundering. Remittance services offered.",
    subcodes: [
      {
        subcode: "CBW-1",
        category: "Policies & Procedures",
        strong:
          "Policies and procedures have been developed to manage risks posed by cross border remittances. ",
        adequate:
          "Policies and procedures for exist to manage risk posed by cross border remittances; however, they must be strengthened. ",
        weak: "No policies and procedures exist for to manage cross border remittances. ",
      },
      {
        subcode: "CBW-2",
        category: "Suspicious Activity Detection",
        strong:
          "Mostly automated suspicious activity monitoring system to address wire transfers. .   ",
        adequate:
          "Mostly manual monitoring is conducted to identify suspicious activity in wire transfers. ",
        weak: "No suspicious activity monitoring of wire transfers exists. ",
      },
      {
        subcode: "CBW-3",
        category: "Third Party Remittances From China / Underground Remitters",
        strong:
          "A formal suspicious activity escalation process and wires are monitored by the Bank's automated transaction monitoring system. ",
        adequate:
          "An informal suspicious activity escalation process exists and wires are monitored by the Bank's automated transaction monitoring system.  ",
        weak: "No suspicious activity process exists and wires are not monitored by the Bank's automated transaction monitoring system. . ",
      },
    ],
  },
  {
    code: "ACH",
    riskCategory: "ODFI, ODFI & ACH",
    lowRisk:
      "Institution is an RDFI who does not originate ACH and has procedures for screening incoming IAT's  and by policy no outgoing IAT's (domestic only).\n\n",
    moderateRisk:
      "Institution is an RDFI and ODFI. Limited international IAT ACH transactions and low volume online ACH origination.",
    highRisk:
      "Wide array of ACH services including international cross-border IAT transactions, high volume online ACH origination by corporate customers, and non-bank Internet based and third party service provider originated ACH transactions.",
    subcodes: [
      {
        subcode: "ACH-1",
        category: "Policies & Procedures",
        strong:
          "Policies and procedures have been developed to manage the risks posed by ACH, including limiting by third party service provider initiated ACH.    ",
        adequate:
          "Policies and procedures for exist to manage risk posed by ACH, however, they must be strengthened. ",
        weak: "No policies and procedures exist for to manage ACH.  ",
      },
    ],
  },
  {
    code: "MI",
    riskCategory: "Monetary instruments",
    lowRisk:
      "The Monetary Instrument Log indicates that the financial institution sells a low amount of monetary instruments and sells to customers only. ",
    moderateRisk:
      "The Monetary Instrument Log indicates that the financial institution sells a moderate amount of monetary instruments to customers and a small amount to non-customers.",
    highRisk:
      "The Monetary Instrument Log indicates that the financial institution sells a high amount of monetary instruments to customers and a moderate amount to non-customers; logs may be incomplete and sequentially numbered monetary instruments may be sold to the same customer.",
    subcodes: [
      {
        subcode: "MI-1",
        category: "Policies & Procedures",
        strong:
          "Policies and procedures have been developed to manage risks posed by monetary instruments.   ",
        adequate:
          "Policies and procedures for exist to manage risk posed by monetary instruments, however, they must be strengthened. ",
        weak: "No policies and procedures exist for to manage monetary instruments. ",
      },
      {
        subcode: "MI-2",
        category: "Suspicious Activity Detection",
        strong:
          "Mostly automated suspicious activity monitoring system to address electronic banking products.   ",
        adequate:
          "Mostly manual monitoring is conducted to identify suspicious activity in electronic banking products.   ",
        weak: "No suspicious activity monitoring of electronic banking products exist. ",
      },
    ],
  },
  {
    code: "LOC-B",
    riskCategory: "Bank & Customer locations",
    lowRisk:
      "The institution is not located in a high intensity drug trafficking area (HIDTA) or high intensity financial crime area (HIFCA). No fund transfers or account relationships involve HIDTAs or HIFCAs. No transactions with high-risk geographies.\n\n\n",
    moderateRisk:
      "The institution is located in a HIDTA or HIFCA. institution has some fund transfers or account relationships that involve HIDTAs or HIFCAs. ",
    highRisk:
      "The institution is located in a HIDTA and a HIFCA. A large number of fund transfers or account relationships involve HIDTAs or HIFCAs. ",
    subcodes: [
      {
        subcode: "LOC-B",
        category: "Policies & Procedures",
        strong:
          "Policy and procedures are thorough, detailed and updated as necessary to reflect changes to the bank\u2019s customer base.  ",
        adequate:
          "Policy and procedures are adequate but have not been updated to reflect changes to the bank\u2019s customer base.  ",
        weak: "Policy and procedures do not exist or are significantly incomplete. ",
      },
    ],
  },
  {
    code: "LOC-C",
    riskCategory: "Customer locations",
    lowRisk: "No transactions with high-risk geographies.",
    moderateRisk: "Minimal transactions with high-risk geographies.",
    highRisk: "Significant volume of transactions with high-risk geographies.",
    subcodes: [
      {
        subcode: "LOC-C",
        category: "Policy / Procedures",
        strong:
          "Policy and procedures are thorough, detailed and updated as necessary to reflect changes to the bank\u2019s customer base.  ",
        adequate:
          "Policy and procedures are adequate but have not been updated to reflect changes to the bank\u2019s customer base.  ",
        weak: "Policy and procedures do not exist or are significantly incomplete. ",
      },
    ],
  },
  {
    code: "NP",
    riskCategory: "New products",
    lowRisk:
      "No new products and services have been introduced or no existing products and services changed since the last assessment.",
    moderateRisk:
      "New products and services have been introduced or existing products and services changed since the last assessment. BSA/AML was included in the risk analysis and implementation plan.",
    highRisk:
      "New products and services have been introduced or existing products and services changed since the last assessment. BSA/AML was NOT included in the risk analysis and implementation plan.",
    subcodes: [
      {
        subcode: "NP-1",
        category: "New Products / Services",
        strong:
          "The bank has a formal process and committee to introduce new products and services. The formal  BSA risk assessment performed by senior level officer or the BSA Officer.   ",
        adequate:
          "The bank has a formal process and committee to introduce new products and services. However, the formal process does not include a formal BSA/AML risk assessment.  ",
        weak: "The bank does not have a formal process and committee to introduce new products and services. ",
      },
    ],
  },
  {
    code: "SAR",
    riskCategory: "SAR filings",
    lowRisk:
      "A relatively low volume of SARS have been filed on bank customers. ",
    moderateRisk: "A moderate volume of SARs filed on bank customers.",
    highRisk:
      "A significant number of SARs filed on bank customers or the institution does not have a centralized SAR monitoring  process, no automated SAR monitoring systems and no documented internal SAR referral system.  ",
    subcodes: [
      {
        subcode: "SAR-1",
        category: "Policies & Procedures",
        strong:
          "SAR policies and procedures are complete, detailed and approved by management and the Board of Directors.  ",
        adequate:
          "SAR procedures exist but need strengthening to address certain high risk areas. .",
        weak: "SAR policies and procedures do not exist. ",
      },
      {
        subcode: "SAR-2",
        category: "SAR Quality ",
        strong:
          "Low volume of correspondence from FINCEN indicates that SARs are accurate.",
        adequate:
          "Volume of correspondence from the FINCEN indicates some errors in SAR reporting.",
        weak: "Volume of correspondence from FINCEN indicates a substantive volume of SAR reporting errors.",
      },
      {
        subcode: "SAR-3",
        category: "Suspicious Activity Monitoring",
        strong: "Mostly automated suspicious activity monitoring system. ",
        adequate:
          "Mostly manual monitoring is conducted to identify suspicious activity in MSB and NBFI customers.  ",
        weak: "No suspicious activity monitoring of MSB and NBFI activity exists.  ",
      },
      {
        subcode: "SAR-4",
        category: "SAR Filing",
        strong: "Mostly automated SAR filing system.",
        adequate: "Mostly manual SAR filing system.",
        weak: "No SAR filing system.",
      },
    ],
  },
];
