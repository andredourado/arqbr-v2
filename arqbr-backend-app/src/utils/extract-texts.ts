import { Endpoint, S3 } from "aws-sdk"
import { v4 as uuidV4 } from 'uuid'
import { promises as fs } from 'fs'
import { createCanvas } from 'canvas'
import { getDocument } from 'pdfjs-dist/legacy/build/pdf'
import { createWorker } from 'tesseract.js'

const s3ClientConstructor = (S3Client): S3 => {
  const s3Client = new S3Client({
    endpoint: new Endpoint('nyc3.digitaloceanspaces.com'),
    region: process.env.AWS_BUCKET_REGION,

  })

  return s3Client
}

const loadFilePromise = (s3Client: S3, params: any) => {
  return new Promise((resolve, reject) => {
    s3Client.getObject(params, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data.Body)
      }
    })
  })
}

const loadFile = async (s3Client: S3, nomeArquivo: string, folder: string) => {
  const params = {
    Bucket: `${process.env.AWS_BUCKET}/${folder}`,
    Key: nomeArquivo,
  }

  return await loadFilePromise(s3Client, params)
}

const extractTextFromFile = async (localFilePath: string, pageNumber: number) => {
  let textOutput: string

  const pdf = await getDocument(localFilePath).promise

  const page = await pdf.getPage(pageNumber)

  const viewport = page.getViewport({ scale: 5.0 })
  const canvas = createCanvas(viewport.width, viewport.height)
  const canvasContext = canvas.getContext('2d')

  const renderContext = {
    canvasContext,
    viewport,
  }

  await page.render(renderContext).promise
  
  const image = canvas.toDataURL('image/png')
  const worker = await createWorker()

  try {
    await worker.loadLanguage('por')
    await worker.initialize('por')

    try {
      const { data: { text } } = await worker.recognize(image);

      textOutput = text
    } catch {
      textOutput = `Erro ao realizar o OCR na página ${pageNumber}`
    }

    await worker.terminate()
  } catch (err) {
    console.error(`Error initializing Tesseract worker: ${err}`)
  }


  return textOutput
}

const writeFileAtTmp = async (file: any, pageNumber: number) => {

  const uuid = uuidV4()
  const localFilePath = `/tmp/${uuid}.pdf`

  try {
    await fs.writeFile(localFilePath, file)

    const texts = await extractTextFromFile(localFilePath, pageNumber)
  
    await fs.unlink(localFilePath)
  
    return texts
  } catch (err) {
    console.error(`Error parsing PDF document: ${err}`)
    return err
  }
}

export const extractTexts = async (nomeArquivo: string, pageNumber: number, folder: string) => {
  const s3Client = s3ClientConstructor(S3)

  try {
    const file = await loadFile(s3Client, nomeArquivo, folder)

    if (file) {
      const text = await writeFileAtTmp(file, pageNumber)
      return text
    }
  } catch (err) {
    return err
  }
}