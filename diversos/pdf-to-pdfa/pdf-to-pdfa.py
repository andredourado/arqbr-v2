import os
import pytesseract
from pdf2image import convert_from_path
import PyPDF2
import io

# Replace with the correct path to the poppler binaries on your Linux system
poppler_path = '/usr/bin/'

# Replace with the correct path to the Tesseract OCR executable on your Linux system
pytesseract.pytesseract.tesseract_cmd = '/usr/bin/tesseract'

images = convert_from_path('./teste.pdf', poppler_path=poppler_path)

i = 0
pdf_writer = PyPDF2.PdfFileWriter()
for image in images:
    # page = pytesseract.image_to_pdf_or_hocr(image, lang='por', extension='pdf')
    # pdf = PyPDF2.PdfFileReader(io.BytesIO(page))
    # pdf_writer.addPage(pdf.getPage(0))

    i = i + 1
    text_path = os.path.join('./', f"page{i}.txt")
    custom_config = r'-c preserve_interword_spaces=1 --tessdata-dir "/usr/share/tesseract-ocr/4.00/tessdata/"'
    # text = pytesseract.image_to_string(image, lang='por', config=custom_config)
    text = pytesseract.image_to_string(image, lang='por')
    file = open(text_path, "a")
    a = file.write(text)
    file.close()

# with open("searchable.pdf", "wb") as f:
#     pdf_writer.write(f)
