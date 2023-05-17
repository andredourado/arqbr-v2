#!/usr/bin/python
# requisitos a serem instalados
# -----------------------------
# sudo apt-get install libzbar0
# pip3 install pyzbar
# pip3 install pdf2imgage
# pip3 install boto3

import os
import os.path
import time
import sys
from sys import argv
import pyzbar.pyzbar as pyzbar
from pyzbar.pyzbar import ZBarSymbol
from PyPDF2 import PdfFileReader, PdfFileWriter
from pdf2image import convert_from_bytes, convert_from_path, pdfinfo_from_path
import cv2
import numpy as np
import boto3
import botocore
sorted(ZBarSymbol.__members__.keys())


# funcoes

def create_filename(file_name, front_page, seq):
    parts = file_name.split('/')
    parts = parts[3].split('-')

    box_name = parts[0][5:] + '_' + parts[len(parts) - 1].replace(".pdf", "")

    parts = str(front_page).replace("'", "").split('_')
    cost_center = parts[1] + '_' + parts[2]
    
    return box_name + '_' + cost_center + '_' + str(seq).zfill(6) + '.pdf'


def check_directory(dir_path):
    if not os.path.isdir(dir_path):
        print(f'\nErro: Diretório "{dir_path}" inexistente\n')
        sys.exit(1)


def get_files(dir_path):
    output = []

    if not os.path.isdir(dir_path):
        return False

    for path in os.listdir(dir_path):
        if os.path.isfile(os.path.join(dir_path, path)):
            output.append(path)

    return output


def upload_files(file_list, spaces, bucket_name):
    for file in file_list:
        parts = file.split('|')
        spaces.meta.client.upload_file(Filename=parts[0], Bucket=bucket_name, Key=parts[1])


def print_fails(fails):
    if len(fails) > 0:
        print()
        print('Fails')
        print('-----')
        print(fails)
        print()


def pages_split(pdf_file, target_dir, spaces, bucket_name, prefix):
    print(f'>>>>>>> {pdf_file}')
    pdfPages = PdfFileReader(pdf_file)

    info = pdfinfo_from_path(pdf_file, userpw=None, poppler_path=None)
    max_pages = info["Pages"]

    i = 0
    files_to_upload = []
    fails = []
    front_page = ''

    writer = PdfFileWriter()

    for current_page in range(1, max_pages + 1):
        pages = convert_from_path(pdf_file, dpi=200, first_page=current_page, last_page=current_page)

        val = pyzbar.decode(pages[0], symbols=[ZBarSymbol.QRCODE])

        if (val != []) and ((b'ARQBR_' in val[0][0]) or (b'SEPARADOR' in val[0][0])):
            new_file_name = 'possivel-erro.pdf'
            
            # check if is a new file

            if (b'ARQBR_' in val[0][0]):
                front_page = val[0][0]

                if '_' in front_page.decode("utf-8"):
                    i += 1
                    new_file_name = create_filename(pdf_file, front_page, i)
                    print(f'------> {target_dir}/{new_file_name}')

                    with open(f'{target_dir}/{new_file_name}','wb') as outfile:
                        writer.write(outfile)
                else:
                    fails.append(pdf_file + '|no frontpage')
                    file_with_error_name = os.path.basename(pdf_file)
                    bucket.put_object(Key=f'arquivos-pdf-sem-qrcode/{file_with_error_name}', Body='')

            # check if is a 'separador'

            if (b'SEPARADOR' in val[0][0]):
                if (type(front_page) != str):
                    front_page = front_page.decode("utf-8")

                if '_' in front_page:
                    i += 1
                    new_file_name = create_filename(pdf_file, front_page, i)
                    print(f'------> {target_dir}/{new_file_name}')
                    
                    with open(f'{target_dir}/{new_file_name}','wb') as outfile:
                        writer.write(outfile)
                else:
                    fails.append(pdf_file + '|no frontpage')
                    file_with_error_name = os.path.basename(pdf_file)
                    bucket.put_object(Key=f'arquivos-pdf-sem-qrcode/{file_with_error_name}', Body='')

            with open(f'{target_dir}/{new_file_name}','wb') as outfile:
                writer.write(outfile)

            writer = PdfFileWriter()

            print(f'------> {prefix}{new_file_name}')
            print()
            
            # append to files list to be uploaded at the end of process

            target_filename = f'{target_dir}/{new_file_name}'
            target_key = f'{prefix}{new_file_name}'

            files_to_upload.append(target_filename + '|' + target_key)
        else:
            writer.addPage(pdfPages.getPage(current_page - 1))

        print(current_page, end="\r")

    if (type(front_page) != str):
        front_page = front_page.decode("utf-8")

    if '_' in front_page:
        new_file_name = create_filename(pdf_file, front_page, i)

        with open(f'{target_dir}/{new_file_name}','wb') as outfile:
            writer.write(outfile)


        # append to files list to be uploaded at the end of process

        target_filename = f'{target_dir}/{new_file_name}'
        target_key = f'{prefix}{new_file_name}'

        files_to_upload.append(target_filename + '|' + target_key)
    else:
        fails.append(pdf_file + '|no frontpage')
        file_with_error_name = os.path.basename(pdf_file)
        bucket.put_object(Key=f'arquivos-pdf-sem-qrcode/{file_with_error_name}', Body='')


    # upload de arquivos

    upload_files(files_to_upload, spaces, bucket_name)

    print_fails(fails)




# main

# get files from digitalocean spaces then check if a pdf was already read and splitted

spaces = boto3.resource('s3',
    endpoint_url="https://nyc3.digitaloceanspaces.com",
    aws_access_key_id="DO00MAJ2XJ3H2VP8NR7X",
    aws_secret_access_key="xhbBZloNZNx3IAC4xnnFbHl9vRfOY8kTD0JXTvSR66g" 
)

bucket_name = 'vamilly-arqbr'
directory_name = 'arquivos-pdf-scanner/'
already_splitted_files_name = directory_name + "already-splitted-files.txt"
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

directory = '/tmp/pdfs-from-s3'

if not os.path.exists(directory):
    os.makedirs(directory)

directory = '/tmp/pdfs-splitted'

if not os.path.exists(directory):
    os.makedirs(directory)
    

# main routine

while True:
    time.sleep(10)

    files = bucket.objects.filter(Prefix=directory_name)

    added_files = [f for f in files if f not in already_splitted_files]
    
    for file in files:
        print('>> ' + os.path.basename(file.key))

        if (os.path.basename(file.key) != ''):
            bucket.download_file(file.key, "/tmp/pdfs-from-s3/" + os.path.basename(file.key))
            pages_split(f'{"/tmp/pdfs-from-s3/" + os.path.basename(file.key)}', "/tmp/pdfs-splitted", spaces, 'vamilly-arqbr', 'arquivos-pdf-separados/')
