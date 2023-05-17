import os
import os.path
import time
from sys import argv
import boto3
import fitz
import PyPDF2
from io import BytesIO
from wand.image import Image
from PIL import Image


# main

# get files from digitalocean spaces then check if a pdf was already read and splitted

spaces = boto3.resource('s3',
    endpoint_url="https://nyc3.digitaloceanspaces.com",
    aws_access_key_id="DO00MAJ2XJ3H2VP8NR7X",
    aws_secret_access_key="xhbBZloNZNx3IAC4xnnFbHl9vRfOY8kTD0JXTvSR66g" 
)

bucket_name = 'vamilly-arqbr'
source_directory_name = 'arquivos-pdf-separados/'
already_splitted_files_name = source_directory_name + "already-splitted-files.txt"
already_splitted_files = []

bucket = spaces.Bucket(bucket_name)

print(f'Tenta ler aquivo "{already_splitted_files_name}"')
s3_object = spaces.Object(bucket_name, already_splitted_files_name)

already_splitted_files = s3_object.get()

if 'Body' in already_splitted_files:
    already_splitted_files = s3_object.get()['Body'].read().decode('utf-8').split('\n')
    print(f'Leitura do aquivo "{already_splitted_files_name}" ok.')
    print()
else:
    bucket.put_object(Key=already_splitted_files_name, Body='')
    print(f'Aquivo "{already_splitted_files_name}" não localizado')
    print()


# check if directories exists at /tmp

directory = '/mnt/volume_arqbr_tmp/pdfs-separados-from-s3'

if not os.path.exists(directory):
    os.makedirs(directory)

directory = '/mnt/volume_arqbr_tmp/pdfs-splitted-by-page'

if not os.path.exists(directory):
    os.makedirs(directory)
    


# main routine

while True:
    time.sleep(10)

    files = bucket.objects.filter(Prefix=source_directory_name)

    added_files = [f for f in files if f not in already_splitted_files]
    
    for file in files:
        print('----')
        print(file.key)

        if os.path.basename(file.key) != '':
            target_directory_name = 'arquivos-pdf-paginas/' + os.path.splitext(os.path.basename(file.key))[0].strip(".")

            source_file = source_directory_name + os.path.basename(file.key)
            file_data = spaces.Object(bucket_name, source_file)

            pdf_file = spaces.Object(bucket_name, source_file).get()['Body'].read()
            pdf_doc = fitz.open(stream=pdf_file, filetype='pdf')

            for page_num, page in enumerate(pdf_doc):
                target_file_name = f'{target_directory_name}/page_{str(page_num + 1).zfill(6)}.png'

                print(target_file_name, end="\r")

                pix = page.get_pixmap(alpha=False)

                img = Image.frombytes('RGB', [pix.width, pix.height], pix.samples)
                png_buffer = BytesIO()
                img.save(png_buffer, format='PNG')

                png_buffer.seek(0)
                spaces.Object(bucket_name, target_file_name).put(Body=png_buffer)
            
            print()
