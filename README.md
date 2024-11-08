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
   ```
2. **Install Dependencies**: Install the required Python and node packages with:

   ```bash
   npm i --legacy-peer-deps
   pip install -r requirements.txt
   ```

3. **Get the API keys**: Get all the API keys mentioned in the `.env` file.

### Usage

**Prepare Data**:

- Collect all relevant banking documents that need to be analyzed. These could include risk assessments, financial statements, compliance records, etc.
- Ensure files are in a format supported by RiskAI (e.g., PDF, DOCX, or plain text).

**Create env file**:

- Create a `.env` file in the root directory of your project with the same format given in config_example.env and get all the keys from Supabase and Gemini:

### Initialise Prisma:

Initialise Prisma with the following command:
   ```bash
    npx prisma init
    npx prisma generate
   ```

### Run RiskAI:
Start the Next.js app by running the main script:
   ```bash
    npm run dev
    
   ```
     
      
     

### Site URL:

The site will be available at [http://localhost:3000/](http://localhost:3000/).

### Login and Onboarding:

- Go to the site and click on SignUp.
- Enter the email and password.
- After the email verification, go to login.
- Enter the email and password.
- After login, you will be redirected to the Onboarding process.
- Fill up the details of the bank and submit it.
- Upload the files related to the bank.
- After the upload, you will be redirected to the dashboard.

### Train Your Model:

- Go to the dashboard and go to the Train Model Section.
- Upload more files if needed.
- Click on the Train Model button.
- It will take 15 seconds to 1 minute to train the model depending on the size of the files.

### View Codes on the Site

- In the "Manage Code" section, you can view all the codes and their respective descriptions and criteria.

### Go to BSA-RSA

- In the BSA-RSA section, you can view all the BSA-RSA codes and their respective descriptions and criteria.
- Then just select the code you want to analyze the risk for and click on the submit button.

### View Results:

- RiskAI will output the inherent risk, mitigation measures, residual risk, and improvement recommendations.
- Go to the "Print Report" section to analyze the overall bank risk and print the report.
- The report will include scores and explanations, offering actionable insights for risk management.
