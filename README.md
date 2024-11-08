# RiskAI

**RiskAI** is an advanced AI system designed to analyze banking documents and assess inherent risks in financial institutions. This AI tool provides a comprehensive overview of potential risks, suggests mitigation controls, calculates residual risk scores, and offers detailed explanations on why certain risks exist and how they can be effectively managed. RiskAI is tailored to help banks identify, understand, and manage potential risk factors, enhancing overall financial stability.

## Features

- **Inherent Risk Analysis**: Detects and evaluates inherent risks within banking operations based on provided documentation.
- **Risk Scoring**: Generates an overall risk score to gauge the severity of inherent risks.
- **Mitigation Controls**: Identifies possible risk mitigation measures and provides a corresponding mitigation score.
- **Residual Risk Evaluation**: Calculates residual risk after considering implemented or recommended controls.
- **Detailed Explanations**: Provides insights into identified risks, their causes, and actionable recommendations to help banks mitigate potential threats.

## Getting Started

Follow these steps to set up and run RiskAI on your local machine.

### Prerequisites

- **Python 3.8+**
- **pip** for managing Python packages

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/SouravBeraAkaSpeed/RiskAi
   cd riskai
2. **Install Dependencies**: Install the required Python and node packages with:
    ```bash
    npm i --legacy-peer-deps
    pip install -r requirements.txt

3. **Get the Api keys** : Get all the APi keys mentioned in the env file.


### Usage

#### Prepare Data:

- Collect all relevant banking documents that need to be analyzed. These could include risk assessments, financial statements, compliance records, etc.
- Ensure files are in a format supported by RiskAI (e.g., PDF, DOCX, or plain text).


#### Create .env file:

Create a .env file in the root directory of your project with the following format and get all the keys from Supabase and Gemini:
    ```bash
    GOOGLE_GENAI_API_KEY=
    NEXT_PUBLIC_SUPABASE_USERNAME = 
    PW = 
    NEXT_PUBLIC_SUPABASE_URL=
    NEXT_PUBLIC_SUPABASE_ANON_KEY=
    SERVICE_ROLE_KEY=
    DIRECT_URL=
    DATABASE_URL =




####  Initialise Prisma:
Initialise Prisma with the following command:
    ```bash
   npx prisma init
   npx prisma generate

#### Run RiskAI:

Start the nextjs app by running the main script:
    ```bash
   npm run dev


#### Site URL:
The site will be available at http://localhost:3000/

#### Login and Onboarding:
- Go to the site and click on the SignUp
- Enter the email and password .
- After the email verification, go to login.
- Enter the email and password .
- After the login, you will be redirected to the OnBoarding process.
- Fill up the Details of the bank and submit it.
- Upload the files related to the bank.
- After the upload, you will be redirected to the dashboard.



#### Train Your Model:
- Go to the dashboard and Go to Train Model Section.
- Upload More Files If Needed
- Click on Train Model Button.
- It will take 15 secs to 1 min to train the model depending on the size of the files.



#### View Codes in the Site 
-In manage Code section you can view all the codes and their respective description and criteria.

#### Go the BSA-RSA
- In the BSA-RSA section you can view all the BSA-RSA codes and their respective description and criteria.
- Then just select the code you want to analysis the risk for and click on the submit button.


#### View Results:

- RiskAI will output the inherent risk, mitigation measures, residual risk, and improvement recommendations.  
- Go to Print Report Section to do Analysis of overall bank risk and print the report.
- The report will include scores and explanations, offering actionable insights for risk management.


