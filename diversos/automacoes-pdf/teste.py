from pathlib import Path
txt = Path('/mnt/c/_lixo/nomes-arquivos.txt').read_text()

if 'CX950_000000407_1025011025_5_000002.pdfx' in txt:
    print('existe')
else:
    print('nao existe')
    