import pytesseract
from pdf2image import convert_from_path
import re

def target_texts_exists(text, targets):
    output = True
    words = targets.split('|')
    
    print("++++++++++++++++++")
    print(words.len)
    print("++++++++++++++++++")

    for word in words:
        if word not in text:
            output = False
            break
    
    return output


def get_fields(text, targets):
    output = ''
    occurence = 0
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
                            occurrence = occurence + 1

                            print("++++++++++++++++++")
                            print(occurrence)
                            print(field['occurrence'])
                            print("++++++++++++++++++")

                            if occurrence == field['occurrence']:
                                output += lines[field['relative_line_index'] + current_index][0:field['length']].strip() + ';'

    return output
        

# main

target = [
    {
        "target_document_texts": "GUIA|DA|PREVIDENCIA|SOCIAL|GPS",
        "fields": [
            {
              "field_name": "competencia",
              "field_label": "Competência",
              "extraction": "regex_date_mm_yyyy",
              "occurrence": 0
            },
            {
              "field_name": "numero_conta",
              "field_label": "Número da Conta",
              "extraction": "line",
              "target_text": "CORRENTE..",
              "occurrence": 2,
              "relative_line_index": 0,
              "position": "last",
              "length": 20
            },
        ]
    }
]

images = convert_from_path('./teste.pdf')

for image in images:
    custom_config = r'-c preserve_interword_spaces=1'
    text = pytesseract.image_to_string(image, config=custom_config)

    response = get_fields(text, target)

    if response != '':
        print("=============================================>")
        print(response)
