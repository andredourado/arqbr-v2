import os
import uuid
import os.path
import time
import boto3
import fitz
from PIL import Image
import tesserocr
import requests
import json
import datetime
import pytesseract
from pdf2image import convert_from_path
import re
import cv2
import numpy as np
import tempfile
from pathlib import Path

def get_jwt(url=''):
    data = {
        'login': 'admin@arquivobras.com.br',
        'password': 'YWRtaW4='
    }

    # print(url)

    url_tempo = f"{url}/sessions"

    response = requests.post(url_tempo, json=data)
    authentication = ''

    if response.status_code == 200:
        authentication = response.json()

    return authentication


def get_document_versions_by_qrcode(url='', token='', qrcode=''):
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }

    data = {
        'qrCode': qrcode 
    }

    response = requests.post(f"{url}/versoes-documento/qrcode", headers=headers, data=json.dumps(data))
    # print(response)
    document_versions = ''

    if response.status_code == 200:
        document_versions = response.json()

    return document_versions 


def create_document(url='', token='', document={}):
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }

    response = requests.post(f'{url}/documentos-digitais/', headers=headers, data=json.dumps(document))
    
    return response.json()


def get_qrcode(file_name):
    parts = file_name.split('_')

    if len(parts) == 5:
        return 'ARQBR_' + parts[2] + '_' + parts[3]
    else:
        return 'ARQBR_' + parts[2] + '_1'


def get_s3_file_by_name(files, file_name):
    output = ''

    for file in files:
        if os.path.basename(file.key) == file_name:
            output = file.key
            break

    return output


def find_file(file_name, target_file_name):
    with open(file_name, 'r') as f: # open the text file for reading
        for line in f:
            if target_file_name in line: # check if the file name is in the current line
                return True
                break 
            else:
                return False


# main

# get files from digitalocean spaces then check if a pdf was already read and splitted

spaces = boto3.resource('s3',
    endpoint_url="https://nyc3.digitaloceanspaces.com",
    aws_access_key_id="DO00MAJ2XJ3H2VP8NR7X",
    aws_secret_access_key="xhbBZloNZNx3IAC4xnnFbHl9vRfOY8kTD0JXTvSR66g" 
)

bucket_name = 'vamilly-arqbr'
source_directory_name = 'arquivos-pdf-separados/'
already_indexed_files_name = source_directory_name + "already-indexed-files.txt"
already_indexed_files = []

bucket = spaces.Bucket(bucket_name)

print(f'Tenta ler aquivo "{already_indexed_files_name}"')
s3_object = spaces.Object(bucket_name, already_indexed_files_name)

already_indexed_files = s3_object.get()

if 'Body' in already_indexed_files:
    # already_indexed_files = s3_object.get()['Body'].read().decode('utf-8').split('\n')
    print(f'Leitura do aquivo "{already_indexed_files_name}" ok.')
    print()
else:
    bucket.put_object(Key=already_indexed_files_name, Body='')
    print(f'Aquivo "{already_indexed_files_name}" não localizado')
    print()


# check if directories exists at /tmp

directory = '/tmp/pdfs-from-s3-to-index'

if not os.path.exists(directory):
    os.makedirs(directory)

directory = '/tmp/pdfs-splitted-to-index'

if not os.path.exists(directory):
    os.makedirs(directory)
    


# main routine

api_url = 'https://apiarqbr.vamilly.com'

files_already_imported = Path('/mnt/c/_lixo/nomes-arquivos.txt').read_text()

while True:
    time.sleep(10)

    files = bucket.objects.filter(Prefix=source_directory_name)

    added_files = [f for f in files if f not in already_indexed_files]

    with open('/tmp/splitted_files_sort_by_size.txt', 'r') as file:
        lines = file.readlines()

    files_by_size = [line.strip().split() for line in lines]
    
    for file in files_by_size:
        file = file[0]

        if file not in files_already_imported:
            file_key = get_s3_file_by_name(files, file)
            print(file)

            output = ''

            if os.path.basename(file_key) != '':
                # print('Passo 1: le arquivo do s3')

                source_file = source_directory_name + os.path.basename(file_key)
                file_data = spaces.Object(bucket_name, source_file)

                with tempfile.NamedTemporaryFile(delete=False) as temp_file:
                    file_data.download_file(temp_file.name)

                # print('Passo 2: converte imagens')

                images = convert_from_path(temp_file.name)

                custom_config = r'-c preserve_interword_spaces=1 -c tessedit_char_whitelist="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ .:/,-@"'

                page_num = 1
                for image in images:
                    # print('Passo 3: trata imagem')

                    image = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
                    image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
                    image = cv2.resize(image, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC)
                    image = cv2.threshold(image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]
                    image = cv2.medianBlur(image, 3)

                    # print('Passo 4: ocr')

                    text = pytesseract.image_to_string(image, lang="por", config=custom_config)
                    #text = pytesseract.image_to_string(image)
                    text = re.sub('@', '0', text)

                    #print('========================================================================')
                    #print(text)
                    #print('========================================================================')


                    print(f'Pagina: {page_num}', end="\r")
                    output += f'\nPagina#{page_num}\n--------\n' + text

                    page_num += 1

                    #break

                authentication = get_jwt(api_url)
                
                token = authentication['token']
                userId = authentication['user']['userId']

                today = datetime.date.today().strftime('%Y-%m-%d')
                #enum_list = enumerate(pdf_doc)
                #enum_size = len(list(enum_list))
                qrcode = get_qrcode(os.path.basename(file_key))
                # output = output[0:50]

                document_versions = get_document_versions_by_qrcode(api_url, token, qrcode)

                document_version_id = None 

                if len(document_versions) > 0:
                    document_version_id = document_versions['data'][0]['id']

                document = {
                    'dataDigitalizacao': today,
                    'versaoDocumentoId': str(document_version_id),
                    'nip': str(uuid.uuid4()),
                    'conteudoQrCode': qrcode,
                    'nomeArquivo': os.path.basename(file_key),
                    'conteudoEmTexto': output,
                    'numeroPaginas': str(len(images)),
                    'pessoaId': '3cc5d4b2-e4d7-4d40-8adb-54d0efe5b6b1'
                }

                response = create_document(api_url, token, document)
                
                #print()
                #print(document)
                #print(response)
                #print()

        else:
            print(file + ' já indexado.')


    quit()

