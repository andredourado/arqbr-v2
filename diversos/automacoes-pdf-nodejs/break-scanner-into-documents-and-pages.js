const { S3Client, ListObjectsV2Command, GetObjectCommand } = require("@aws-sdk/client-s3");
const { promises: fs, readFileSync, createWriteStream } = require('fs')
const path = require('path')
const dotenv = require('dotenv')
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf')
const { createCanvas } = require('canvas')
const { createWorker } = require('tesseract.js')


dotenv.config()

//
// checks if parameter is a number
//
function isNumber(val) {
  return true
}

//
// read variables from .env file
//
const readDotenvVariables = () => {
  const doSpacesEndpoint = process.env.DO_SPACES_ENDPOINT
  const doSpacesKey = process.env.DO_SPACES_KEY
  const doSpacesSecret = process.env.DO_SPACES_SECRET
  const doSpacesName = process.env.DO_SPACES_NAME
  const arqbrTempFiles = process.env.ARQBR_TEMP_FILES
  const arqbrAlreadySplittedFilesDir = process.env.ARQBR_ALREADY_SPLITTED_FILES_DIR
  const arqbrCostCenterBoxes = process.env.ARQBR_COST_CENTER_BOXES
  const arqbrDocumentBreakStrategiesDir = process.env.ARQBR_DOCUMENT_BREAK_ESTRATEGIES_DIR

  return {
    doSpacesEndpoint,
    doSpacesKey,
    doSpacesSecret,
    doSpacesName,
    arqbrTempFiles,
    arqbrAlreadySplittedFilesDir,
    arqbrCostCenterBoxes,
    arqbrDocumentBreakStrategiesDir
  }
}

//
// creates a S3 object
//
const createS3Client = (S3Client, dotEnvVars) => {
  const doSpacesEndpoint = dotEnvVars.doSpacesEndpoint
  const doSpacesKey = dotEnvVars.doSpacesKey
  const doSpacesSecret = dotEnvVars.doSpacesSecret

  const s3Client = new S3Client({ 
    endpoint: doSpacesEndpoint, 
    region: 'us-east-1',
    credentials: {
      accessKeyId: doSpacesKey, 
      secretAccessKey: doSpacesSecret
    }
  })

  return s3Client
}

// 
// return an array of S3 objects
//
const getS3Objects = async (s3Client, bucketName, prefix) => {
  let objects = []

  try {
    const response = await s3Client.send(
      new ListObjectsV2Command({
        Bucket: bucketName,
        Prefix: prefix,
        Sort: 'Size'
      })
    );

    objects = response.Contents.sort((a, b) => a.Size - b.Size)
  } catch (error) {
    console.error(error)
  }

  return objects
}

//
// return if targetFile exists on processedFilesFile
//
const fileExists = async (processedFilesDir, targetFile) => {
  try {
    await fs.accessSync(processedFilesDir + path.basename(targetFile), fs.constants.F_OK)
    return true
  } catch (error) {
    return false
  } 
}

//
// creates an empty file with same name the file on S3
//
const createEmptyFile = async (processedFilesDir, targetFile) => {
  try {
    await fs.writeFile(processedFilesDir + path.basename(targetFile), '-')
  } catch (error) {
    console.error(`Error creating file: ${processedFilesDir + path.basename(targetFile)}. ${error}`)
  }
}

//
// reads csv with boxes x cost centers
//
const readCostCenterBoxesCsvFile = (csvFilePath) => {
  try {
    const data = readFileSync(csvFilePath, 'utf-8')
    const lines = data.split('\n')
    const obj = {}
    for (const line of lines) {
      const [key, value] = line.split(';')
      obj[key.replace(/\D/g,'')] = value
    }
    return obj
  } catch (error) {
    console.error(`Error reading file: ${csvFilePath}. ${error}`)
    return null
  }
}

//
// extracts box number from file name
//
const extractBoxNumber = (pdfFileName) => {
  const regex = /(ARQBRCX?)(\d+)-/
  const match = pdfFileName.match(regex)

  if (match && match[2]) {
    return match[2]
  } else {
    throw new Error('Invalid string format')
  }
}

//
// extracts rest of pdf file name but box number
//
const extractRestOfFileName = (pdfFileName) => {
  const regex = /-(.*)\.pdf/
  const match = pdfFileName.match(regex)
  if (match && match[1]) {
    return match[1].trim()
  } else {
    throw new Error('Invalid string format')
  }
}
  
//
// extracts all data from pdf file name
//
const extractFileNameData = (pdfFileName, costCenterBoxes) => {
  const fileName = path.basename(pdfFileName)
  const boxNumber = parseInt(extractBoxNumber(fileName)).toString()
  const restOfFileName = extractRestOfFileName(fileName)

  let costCenter = costCenterBoxes[boxNumber]

  if (costCenter !== undefined) {
    costCenter = costCenter.replace(/\r/g, '') 
  } else {
    costCenter = ''
  }

  return {
    fileName,
    boxNumber,
    restOfFileName,
    costCenter
  }
}

//
// read documents break strategies for cost center
//
const getDocumentsBreakStrategies = (costCenter, documentBreakStrategiesDir) => {
  const targetFileName = documentBreakStrategiesDir + 'break-strategies-' + costCenter + '.json'
  let obj = {}

  try {
    obj = JSON.parse(readFileSync(targetFileName))
  } catch (err) {
    obj = {}
  }

  return obj
}

//
// writes a stream to a file
//
const writeToFile = (fileStream) => {
  return new Promise(async (resolve, reject) => {
    fileStream.on('finish', () => { resolve() })
    fileStream.on('error', () => { reject() })
  })
}

//
// read pdf file then ocr returning text content in pages
//
const readPdfFileFromS3 = async (s3Client, bucketName, prefix, fileKey) => {
  let output = []
  const getObjectParams = {
    Bucket: bucketName,
    Key: prefix + path.basename(fileKey)
  }

  try {
    const getObjectCommand = new GetObjectCommand(getObjectParams)
    const objectResponse = await s3Client.send(getObjectCommand);
    const objectStream = objectResponse.Body;

    if (objectStream) {
      try {      
        const localFilePath = '/tmp/teste.pdf'
      
        const fileStream = createWriteStream(localFilePath)

        await objectStream.pipe(fileStream)

        await writeToFile(fileStream)
          .then(async () => {
            try {
              const pdf = await pdfjsLib.getDocument(localFilePath, { verbosity: 0 }).promise
              const numPages = pdf.numPages
    
              const pages = Array.from({length: numPages}, (_, i) => i + 1)
              
              for await (let i of pages) {
                console.log('Page: ' + parseInt(i))
                const page = await pdf.getPage(i)
    
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
                    const { data: { text } } = await worker.recognize(image, {
                      tessedit_create_txt: '1',
                      tessedit_create_hocr: '0',
                      config: 'hocr',
                      preserve_interword_spaces: '1'
                    });
    
                    output.push(text)
                  } catch (err) {
                    console.error(`Error performing OCR: ${err}`)
                  }
    
                  await worker.terminate()
                } catch (err) {
                  console.error(`Error initializing Tesseract worker: ${err}`)
                }
              }
            } catch (err) {
              console.error(`Error parsing PDF document: ${err}`)
            }
          })
          .catch(err => console.log(err))
      } catch (err) {
        console.log('ERROR: ', err)
      }
    }
  } catch (err) {
    //console.log('ERROR: ', err)
  }

  return output
}

//
// extracts patterns regex from text
//
const formatAndValidateDate = (text, format) => {
  let output = text.replace(' ', '')
  let parts = []

  if (output.length !== format.length) {
    output = ''
  }

  switch (format) {
    case 'mm/yyyy':
      if (!output.includes('/')) {
        output = ''
      } else {
        parts = output.split('/')

        if ((!isNumber(parts[0])) || (!isNumber(parts[1]))) {
          output = ''
        } else {
          if ((parseInt(parts[0]) > 13) || (parseInt(parts[1]) < 1500)) {
            output = ''
          }
        }
      }
  }

  return output
}

//
// extracts patterns regex from text
//
const extractByRegex = (text, pattern, occurence=0) => {
  const regex = pattern
  const matches = []
  let match

  while ((match = regex.exec(text)) !== null) {
    matches.push(match[0])
  }

  console.log(matches, matches.length, matches[occurence])

  if (matches.length > 0) {
    return matches[occurence]
  } else {
    return ''
  }
}

//
// identifies document fields and its contents
//
const findDocumentFieldsContents = (pageText, fields) => {
  output = []

  if ((!pageText.toUpperCase().includes('XXX-SEPARADOR-XXX')) && (!pageText.toUpperCase().includes('COMPROVANTE DE PAGAMENTO'))) {
    const regexDateMmYyyy = /\b(\[\s*\d{1,2}\s*\/\s*\d{4}\]\d|\]\d{1,2}\s*\/\s*\d{4}\[|\[\s*\d{1,2}\s*\/\s*\d{2}\]\d|\]\d{1,2}\s*\/\s*\d{2}\[)\b|\b(\d{1,2}\s*\/\s*\d{4}|\[\s*\d{1,2}\s*\/\s*\d{2}\]\d)\b/g

    fields.forEach(field => {
      let tempFieldContent = {
        fieldName: field.field_name,
        fieldTitle: field.field_title,
        content: ''
      }

      switch (field.method) {
        case 'regex_date_mm_yyyy':
          tempFieldContent.content = formatAndValidateDate(extractByRegex(pageText, regexDateMmYyyy), 'mm/yyyy')
          output.push(tempFieldContent)
          break

        default:
          output.push(tempFieldContent)
          break
      }
    })
  }

  return output
}

//
// identifies which page must break documents according to document break strategies
//
const findBreakStrategies = (pageNumber, pageText, documentsBreakStrategies) => {
  output = {
    page: pageNumber,
    document: '',
    description: '',
    fields: []
  }
  let shouldBreak = false

  documentsBreakStrategies.forEach(strategy => {
    const pageBreaks = strategy.breaks

    pageBreaks.forEach(pageBreak => {
      if (!pageText.toUpperCase().includes('XXX-SEPARADOR-XXX')) {
        if (!pageText.toUpperCase().includes('COMPROVANTE DE PAGAMENTO')) {
          if (pageText.toUpperCase().includes(pageBreak)) {
            output = {
              page: pageNumber,
              document: strategy.document,
              description: strategy.description,
              fields: findDocumentFieldsContents(pageText, strategy.fields)
            }

            shouldBreak = true
            return
          }
        } else {
          output = {
            page: pageNumber,
            document: 'COMPROVANTE DE PAGAMENTO',
            description: '',
            fields: [] 
          }
  
          shouldBreak = true
          return
        }
      } else {
        output = {
          page: pageNumber,
          document: 'SEPARADOR',
          description: '',
          fields: []  
        }

        shouldBreak = true
        return
      }
    })

    if (shouldBreak) {
      return 
    }
  })

  return output
}

//
// analyze each page returning which document and its fields contents
//
const analyzeDocumentTypes = (pages, documentsBreakStrategies) => {
  let output = []

  pages.forEach((page, index) => {
    console.log(`${index} =========================================================`)
    console.log(page);
    console.log();

    const documentTypes = findBreakStrategies(index, page, documentsBreakStrategies)

    output.push(documentTypes)
  });

  return output
}


// -----------------------------------------------------------------
// main routine
// -----------------------------------------------------------------

(async () => {
  // read .env variables
  dotEnvVars = readDotenvVariables()

  // read csv files
  const costCenterBoxes = await readCostCenterBoxesCsvFile(dotEnvVars.arqbrCostCenterBoxes)

  // read scanned files from digitalocean spaces S3
  const s3Client = createS3Client(S3Client, dotEnvVars)
  const arquivosPdfFromScanner = await getS3Objects(s3Client, 'vamilly-arqbr', 'arquivos-pdf-scanner/')

  // break into splitted-files
  //for await (let file of arquivosPdfFromScanner) {
    const tempFileKey = 'arquivos-pdf-scanner/ARQBRCX01-000000167.pdf'  
    //const tempFileKey = file.key 
    try {
      //if (!await fileExists(dotEnvVars.arqbrAlreadySplittedFilesDir, tempFileKey)) {
        const fileNameData = extractFileNameData(tempFileKey, costCenterBoxes)
        const documentsBreakStrategies = getDocumentsBreakStrategies(fileNameData.costCenter, dotEnvVars.arqbrDocumentBreakStrategiesDir)
  
        console.log('>>>>>>>', fileNameData.costCenter, tempFileKey)
  
        const pages = await readPdfFileFromS3(s3Client, 'vamilly-arqbr', 'arquivos-pdf-scanner/', tempFileKey)
        const documentTypes = analyzeDocumentTypes(pages, documentsBreakStrategies)

        console.log(JSON.stringify(documentTypes, "\t"))

        await createEmptyFile(dotEnvVars.arqbrAlreadySplittedFilesDir, tempFileKey)
      //} else {
      //  console.log(path.basename(tempFileKey) + ' already processed!')
      //}
        return
    } catch (err) {
      console.log('ERRO: ', err)
    }
  //}
  

  // break into pages
  // write data on database
})()
