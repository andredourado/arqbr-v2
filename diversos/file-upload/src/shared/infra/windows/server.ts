import fs from 'fs'
import { tmpFolder } from '@config/upload'
import { container } from 'tsyringe'
import { UploadFileUseCase } from '@modules/upload/use-cases/upload-file/upload-file-use-case'
import "reflect-metadata"
import 'dotenv/config'
import '@shared/container/providers/storage-provider'

const checkDirectoryForNewFiles = async (directoryPath: string) => {
  const filesAlreadyTaken = await fs.promises.readFile('./files-already-taken.txt', 'utf-8')

  const uploadFileUseCase = container.resolve(UploadFileUseCase)
  
  fs.readdir(directoryPath, async (err, fileList) => {
    if (err) {
      console.error(`Error reading directory ${directoryPath}: ${err}`);
      return;
    }

    for await (let file of fileList) {
      if (!filesAlreadyTaken.includes(file) && file !== '') {
        await uploadFileUseCase.execute({
          fileName: file,
          targetDirectory: 'arquivos-pdf-scanner'
        })
          .then(() => {
            fs.writeFile('./files-already-taken.txt', filesAlreadyTaken + '\n' + file, () => {
              console.log('sucesso')
            })
          })
          .catch((err) => console.log(err))
      }
    }
  });
}

setInterval(() => {
  checkDirectoryForNewFiles(tmpFolder);
}, 1000);
