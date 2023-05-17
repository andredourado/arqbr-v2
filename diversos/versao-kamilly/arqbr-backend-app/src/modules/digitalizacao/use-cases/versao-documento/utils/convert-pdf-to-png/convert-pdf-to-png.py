import json
import asyncio
import sys
import os
from pdf2image import convert_from_path
import pytesseract


async def process_pdf(file_name, source_directory, target_directory):
    if not os.path.exists(target_directory):
        os.makedirs(target_directory)

    images = convert_from_path(source_directory + file_name)

    page = 0
    for i, image in enumerate(images):
        image_folder = os.path.join(target_directory, os.path.splitext(os.path.basename(source_directory + file_name))[0])

        if not os.path.exists(image_folder):
            os.makedirs(image_folder)

        # image
        image_path = os.path.join(image_folder, f"page{i}.png")
        image.save(image_path, "PNG")

        # text
        text_path = os.path.join(image_folder, f"page{i}.txt")
        custom_config = r'-c preserve_interword_spaces=1'
        text = pytesseract.image_to_string(image, config=custom_config)
        file = open(text_path, "a")
        a = file.write(text)
        file.close()

        # print(text)

        page = i + 1

    # sys.stdout.write(str(page))
    json_data = json.dumps([{ "text": text, "page": page }])
    sys.stdout.write(json_data)


# main

if len(sys.argv) < 4:
    print('\nUso: python3 convert-pdf-to-png.py <arquivo-pdf> <diretorio-origem> <diretorio-destino>\n')
    sys.exit(0)

file_name = sys.argv[1:][0]
source_directory = sys.argv[1:][1]
target_directory = sys.argv[1:][2]

asyncio.run(process_pdf(file_name, source_directory, target_directory))


