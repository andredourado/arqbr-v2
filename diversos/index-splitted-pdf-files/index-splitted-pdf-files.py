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


def get_jwt(url=''):
    data = {
        'login': 'admin@arquivobras.com.br',
        'password': 'YWRtaW4='
    }

    response = requests.post(f'{url}/sessions', json=data)
    authentication = ''

    if response.status_code == 200:
        authentication = response.json()

    return authentication

def create_document(url='', token='', document={}):
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }

    response = requests.post(f'{url}/documentos-digitais/', headers=headers, data=json.dumps(document))
    
    return response.json()

def get_qrcode(file_name):
    parts = file_name.split('_')
    return 'ARQBR_' + parts[2] + '_' + parts[3]



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
    already_indexed_files = s3_object.get()['Body'].read().decode('utf-8').split('\n')
    print(f'Leitura do aquivo "{already_indexed_files_name}" ok.')
    print()
else:
    bucket.put_object(Key=already_indexed_files_name, Body='')
    print(f'Aquivo "{already_indexed_files_name}" não localizado')
    print()


# check if directories exists at /tmp

directory = '/tmp/pdfs-from-s3'

if not os.path.exists(directory):
    os.makedirs(directory)

directory = '/tmp/pdfs-splitted'

if not os.path.exists(directory):
    os.makedirs(directory)
    


# main routine

api_url = 'http://localhost:3333'

while True:
    time.sleep(10)

    files = bucket.objects.filter(Prefix=source_directory_name)

    added_files = [f for f in files if f not in already_indexed_files]
    
    for file in files:
        print(file.key)

        output = ''

        if os.path.basename(file.key) != '':
            source_file = source_directory_name + os.path.basename(file.key)
            file_data = spaces.Object(bucket_name, source_file)

            pdf_file = spaces.Object(bucket_name, source_file).get()['Body'].read()
            pdf_doc = fitz.open(stream=pdf_file, filetype='pdf')

            for page_num, page in enumerate(pdf_doc):
                pix = page.get_pixmap(alpha=False)
                img = Image.frombytes('RGB', [pix.width, pix.height], pix.samples)
                
                text = tesserocr.image_to_text(img)

                print(f'Pagina: {page_num}', end="\r")
                output += f'\nPagina#{page_num}\n--------\n' + text

            authentication = get_jwt(api_url)
            
            token = authentication['token']
            userId = authentication['user']['userId']

            today = datetime.date.today().strftime('%Y-%m-%d')
            enum_list = enumerate(pdf_doc)
            enum_size = len(list(enum_list))

            document = {
                'dataDigitalizacao': today,
                'versaoDocumentoId': 'c19a89c7-7774-48fe-bbca-9f3303dd5783',
                'nip': str(uuid.uuid4()),
                'conteudoQrCode': get_qrcode(os.path.basename(file.key)),
                'nomeArquivo': os.path.basename(file.key),
                'conteudoEmTexto': output,
                'numeroPaginas': str(enum_size),
                'pessoaId': '1757bb9f-f675-4597-b392-3635d8042d8e'
            }

            response = create_document(api_url, token, document)
            
            print()
            print(response)
            print()
