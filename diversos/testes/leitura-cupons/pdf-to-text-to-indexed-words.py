import pytesseract
from pdf2image import convert_from_path
import re
import cv2
import numpy as np

def target_texts_exists(text, targets):
    output = True
    words = targets.split('|')

    for word in words:
        if word not in text:
            output = False
            break
    
    return output


def get_fields(text, targets):
    output = ''
    lines = text.splitlines()

    # check whole text context

    for target in targets:
        if target_texts_exists(text, target['target_document_texts']):
            for field in target['fields']:
                if field['extraction'] == 'regex_date_mm_yyyy':
                    matches = re.findall(r"\b\d{2}/\d{4}\b", text)

                    if len(matches) > 0:
                        output += matches[ field['occurence'] ] + ';'

    # check lines context

    for current_index, line in enumerate(lines):
        for target in targets:
            if target_texts_exists(text, target['target_document_texts']):
                for field in target['fields']:
                    if field['extraction'] == 'line':
                        if target_texts_exists(line, field['target_text']):
                            output += lines[field['relative_line_index'] + current_index][0:field['length']].strip() + ';'

    return output
        

# main

target = [
    {
        "document_type": "10255011_1",
        "target_document_texts": "GUIA|DA|PREVIDENCIA|SOCIAL|GPS",
        "fields": [
            {
              "field_name": "competencia",
              "field_label": "Competência",
              "extraction": "regex_date_mm_yyyy",
              "occurence": 0,
            },
            {
              "field_name": "nome_empregado",
              "field_label": "Nome do Empregado",
              "extraction": "line",
              "target_text": "NOME|OU|RAZ|SOCIAL|FONE",
              "relative_line_index": 2,
              "position": "first",
              "length": 50
            },
        ]
    }
]

images = convert_from_path('./teste-cupons.pdf')

for image in images:
    custom_config = r'-c preserve_interword_spaces=1 -c tessedit_char_whitelist="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ .:/,-@"'

    image = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    image = cv2.resize(image, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC)
    image = cv2.threshold(image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]
    image = cv2.medianBlur(image, 3)

    text = pytesseract.image_to_string(image, config=custom_config)
    text = re.sub('@', '0', text)

    print(text)
    print('--------')

    response = get_fields(text, target)

    if response != '':
        print(response)
