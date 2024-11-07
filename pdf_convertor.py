import argparse
from fpdf import FPDF

# Set up argument parser
parser = argparse.ArgumentParser(description='Generate PDF from a text file.')
parser.add_argument('filename', type=str, help='The name of the text file to read from')
parser.add_argument('--output', type=str, default='output.pdf', help='The name of the output PDF file')
args = parser.parse_args()

# Create instance of FPDF class
pdf = FPDF()

# Add a page
pdf.add_page()

# Set font
pdf.set_font("Arial", size=15)

# Open the provided file
with open(args.filename, "r") as f:
    for line in f:
        if line.startswith("**") and line.endswith("**\n"):
            # Remove the surrounding '**' and strip any leading/trailing whitespace
            heading = line.strip()[2:-2].strip()
            pdf.set_font("Arial", 'B', size=15)  # Set font to bold
            pdf.cell(200, 10, txt=heading, ln=1)
            pdf.set_font("Arial", size=15)  # Reset font to regular
        else:
            pdf.cell(200, 10, txt=line.strip(), ln=1)

# Save the pdf with the specified name
pdf.output(args.output)
