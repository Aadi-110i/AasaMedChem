import pdfplumber

def extract_text(pdf_path):
    try:
        with pdfplumber.open(pdf_path) as pdf:
            text = ""
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
            return text
    except Exception as e:
        return str(e)

if __name__ == "__main__":
    pdf_path = r"C:\Users\Le\OneDrive\Desktop\med\aasa medchemassignmenta11.pdf"
    print(extract_text(pdf_path))
