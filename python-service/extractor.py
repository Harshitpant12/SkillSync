from pdfminer.high_level import extract_text_to_fp
from pdfminer.layout import LAParams
import io

def extract_text_from_pdf(pdf_bytes):
    try:
        output = io.StringIO()
        with io.BytesIO(pdf_bytes) as pdf_file:
            extract_text_to_fp(pdf_file, output, laparams=LAParams())
        return output.getvalue()
    except Exception as e:
        return None