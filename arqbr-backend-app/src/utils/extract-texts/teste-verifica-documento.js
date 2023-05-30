const { S3Client, ListObjectsV2Command, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const { promises: fs, readFileSync, createWriteStream, createReadStream } = require('fs')
const { Readable } = require('stream');
const { PDFDocumentFactory, PDFDocumentWriter, drawImage } = require('pdfjs-dist/legacy/build/pdf');
const { PDFDocument } = require('pdf-lib');
const { createCanvas } = require('canvas')
const { createWorker } = require('tesseract.js')
const { exec } = require('child_process');
const axios = require('axios');
const path = require('path')
const dotenv = require('dotenv')
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf');

dotenv.config()

//
// checks if parameter is a number
//
function isNumber(val) {
  return true
}

//
// generate an UUID v4
//
const generateUUIDv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

//
// delete a file
//
const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Error deleting file:', err)
    } else {
      console.log('File deleted successfully')
    }
  })
}

//
// read variables from .env file
//
const readDotenvVariables = () => {
  const doSpacesEndpoint = "https://nyc3.digitaloceanspaces.com"
  const doSpacesKey = "DO00MAJ2XJ3H2VP8NR7X"
  const doSpacesSecret = "xhbBZloNZNx3IAC4xnnFbHl9vRfOY8kTD0JXTvSR66g"
  const doSpacesName = "vamilly-arqbr"
  const arqbrTempFiles = "/volume_arqbr_tmp/area-temporaria-arquivobras"
  const arqbrAlreadySplittedFilesDir = "/volume_arqbr_tmp/area-temporaria-arquivobras/arquivos-controle/scanned-already-splitted-files/"
  const arqbrCostCenterBoxes = "/opt/projetos/arqbr-v2/arqbr-backend-app/src/utils/extract-texts/caixa-centro-custo.csv"
  const arqbrDocumentBreakStrategiesDir = "./"

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
const readPdfFileFromS3 = async (s3Client, bucketName, prefix, fileKey, numeroPaginas) => {
  let textOutput = []
  let imageOutput = []
  let localFilePath = ''
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
        const uuid = generateUUIDv4()
        localFilePath = `/tmp/${uuid}.pdf`
      
        const fileStream = createWriteStream(localFilePath)

        await objectStream.pipe(fileStream)

        await writeToFile(fileStream)
          .then(async () => {
            try {
              const pdf = await pdfjsLib.getDocument(localFilePath, { verbosity: 0 }).promise
              // DEVELOPMENT: here you can put number of pages what you need to test or uncomment real line with pdf.numPages
              const numPages = numeroPaginas
              //const numPages = pdf.numPages
    
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

                imageOutput.push(image)
    
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
    
                    textOutput.push(text)
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

      deleteFile(localFilePath)
    }
  } catch (err) {
    //console.log('ERROR: ', err)
  }

  return { textPages: textOutput, imagePages: imageOutput } 
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
  const patterns = {
    'mm/yyyy': /\b(\[\s*\d{1,2}\s*\/\s*\d{4}\]\d|\]\d{1,2}\s*\/\s*\d{4}\[|\[\s*\d{1,2}\s*\/\s*\d{2}\]\d|\]\d{1,2}\s*\/\s*\d{2}\[)\b|\b(\d{1,2}\s*\/\s*\d{4}|\[\s*\d{1,2}\s*\/\s*\d{2}\]\d)\b/g,
    'long_date': /(\w+-\w+|\w+),?\s+(\d{1,2})\s+de\s+(janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)\s+de\s+(\d{4})/g,
  } 

  const regex = patterns[pattern]
  const matches = []
  let match

  while ((match = regex.exec(text)) !== null) {
    matches.push(match[0])
  }

  if (matches.length > 0) {
    return matches[occurence]
  } else {
    return ''
  }
}

//
// search for a text then gets by line skipping from a string inside line for a specific length
//
const extractBySearchTextGetLine = (text, field) => {
  let targetLine = ''
  lines = text.replace(/(^[ \t]*\n)/gm, "").split("\n")

  for (let index = 0; index < lines.length; index++) {
    field.search_text.forEach(searchText => {
      if (lines[index].toUpperCase().includes(searchText.toUpperCase())) {
        targetLine = lines[index + field.line]
        return
      }
    })

    if (targetLine !== '') {
      break
    }
  }

  let tempResult = ''

  if (typeof field.extraction_start === 'string' || field.extraction_start instanceof String) {
    let tempResult = targetLine.substring(targetLine.indexOf(field.extraction_start) + field.extraction_start.length, field.extraction_length).trim()

    tempResult = tempResult.replace(/[|!;\[\]]/g, '')

    if (tempResult.includes(field.extraction_start)) {
      tempResult = tempResult.substring(tempResult.indexOf(field.extraction_start) + field.extraction_start.length, field.extraction_length).trim()
    }
    
    if (tempResult.includes('   ')) {
      tempResult = tempResult.substring(tempResult.indexOf('   ') + 3, field.extraction_length).trim()
    }
  } else {
    let tempResult = targetLine.substring(field.extraction_start + field.extraction_start.length, field.extraction_length).trim()

    tempResult = tempResult.replace(/[|!;\[\]]/g, '')
    
    if (tempResult.includes('   ')) {
      tempResult = tempResult.substring(tempResult.indexOf('   ') + 3, field.extraction_length).trim()
    }
  }

  return tempResult
}

//
// identifies document fields and its contents
//
const findDocumentFieldsContents = (pageText, fields) => {
  output = []

  if ((!pageText.toUpperCase().includes('XXX-SEPARADOR-XXX')) && (!pageText.toUpperCase().includes('COMPROVANTE DE PAGAMENTO'))) {
    fields.forEach(field => {
      let tempFieldContent = {
        fieldName: field.field_name,
        fieldTitle: field.field_title,
        content: ''
      }

      switch (field.method) {
        case 'regex_date_mm_yyyy':
          tempFieldContent.content = formatAndValidateDate(extractByRegex(pageText, 'mm/yyyy'), 'mm/yyyy')
          output.push(tempFieldContent)
          break

        case 'regex_long_date':
          tempFieldContent.content = formatAndValidateDate(extractByRegex(pageText, 'long_date'), 'long_date')
          output.push(tempFieldContent)
          break

        case 'regex_dd/mm/yyyy':
          tempFieldContent.content = formatAndValidateDate(extractByRegex(pageText, 'dd/mm/yyyy'), 'long_date')
          output.push(tempFieldContent)
          break

        case 'search_text_get_line':
          tempFieldContent.content = extractBySearchTextGetLine(pageText, field)
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
          if (pageText.toUpperCase().includes(pageBreak.toUpperCase())) {
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
            document: 'COMPROVANTE DE PAGAMENTO'
          }
  
          shouldBreak = true
          return
        }
      } else {
        output = {
          page: pageNumber,
          document: 'SEPARADOR' 
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
    // console.log(`${index} =========================================================`)
    // console.log(page);
    // console.log();

    const documentTypes = findBreakStrategies(index, page, documentsBreakStrategies)

    output.push(documentTypes)
  });

  return output
}

//
// create a pdf from an array of images in base64 format
//
const createPdfFromBase64 = async (imageBase64DataArray, filePath) => {
  const pdfDoc = await PDFDocument.create();
  
  for (const imageBase64Data of imageBase64DataArray) {
    const imageBytes = Buffer.from(imageBase64Data.split(',')[1], 'base64');
    const image = await pdfDoc.embedPng(imageBytes);
    const page = pdfDoc.addPage();

    const { width, height } = image.scale(1);
    page.setSize(width, height);

    page.drawImage(image, {
      x: 0,
      y: 0,
      width: width,
      height: height,
    });
  }

  const pdfBytes = await pdfDoc.save();

  await fs.writeFile(filePath, pdfBytes).then(() => {
  //await fs.writeFile(filePath.replace('.pdf', '_temp.pdf'), pdfBytes).then(() => {
    // Execute Ghostscript command for PDF/A conversion
    //const ghostscriptCommand = `gs -dPDFA=2 -dBATCH -dNOPAUSE -sProcessColorModel=DeviceRGB -sDEVICE=pdfwrite -sOutputFile=${filePath} ${filePath.replace('.pdf', '_temp.pdf')}`;
    //const ghostscriptCommand = `gs -dPDFA -dBATCH -dNOPAUSE -sProcessColorModel=DeviceRGB -sDEVICE=pdfwrite -sPDFACompatibilityPolicy=1 -sOutputFile=${filePath} ${filePath.replace('.pdf', '_temp.pdf')}`;

    // exec(ghostscriptCommand, (error) => {
    //   if (error) {
    //     console.error('PDF/A conversion failed:', error);
    //   } else {
    //     console.log('PDF/A conversion successful!');
    //   }
  
    //   // Remove temporary PDF file
    //   deleteFile(filePath.replace('.pdf', '_temp.pdf'));
    // })
  })
}

//
// get document fields contents to compare is in a loop document loop was broken
//
const getDocumentContents = (documentFields) => {
  let output = ''

  for (let documentField of documentFields) {
    output += documentField.content.trim()
  }

  return output
}

//
// analyze each page returning which document and its fields contents
//
const createPdfFilesFromImages = async (documentTypes, imagePages, fileNameData) => {
  let fileNameList = []
  let pagesArray = []
  let sequence = 1

  //console.log(documentTypes)
  
  let previousDocumentContent = getDocumentContents(documentTypes[0].fields)
  let previousDocument = documentTypes[0].document

  for await (let documentType of documentTypes) {
    if (documentType.document !== 'SEPARADOR') {
      if (documentType.fields !== undefined) {
        if (documentType.fields.length > 0) {
          if (previousDocumentContent !== getDocumentContents(documentType.fields)) {
            const newFileName = `ARQBRCX${fileNameData.boxNumber.padStart(6, '0')}_${fileNameData.restOfFileName}_${previousDocument.replace('ARQBR_', '')}_${sequence.toString().padStart(6, '0')}.pdf`
            localFilePath = `/tmp/${newFileName}`
            fileNameList.push(localFilePath)
            
            await createPdfFromBase64(pagesArray, localFilePath).then(() => {
              pagesArray = []
              previousDocumentContent = getDocumentContents(documentType.fields)
              previousDocument = documentTypes[0].document
              sequence = sequence + 1
            })
          }
        }
      }

      pagesArray.push(imagePages[documentType.page])
    }
  }

  if (pagesArray.length > 0) {
    const newFileName = `ARQBRCX${fileNameData.boxNumber.padStart(6, '0')}_${fileNameData.restOfFileName}_${previousDocument.replace('ARQBR_', '')}_${sequence.toString().padStart(6, '0')}.pdf`
    localFilePath = `/tmp/${newFileName}`
    fileNameList.push(localFilePath)
    
    await createPdfFromBase64(pagesArray, localFilePath)
  }

  return fileNameList
}

//
// upload created pdf files to S3
//
async function uploadPdfFilesToS3(S3Client, filePaths, bucketName, prefix) {
  for await (let filePath of filePaths) {
    const fileData = await fs.readFile(filePath)
    const fileStream = Readable.from(fileData)
    const contentLength = fileData.length

    const uploadParams = {
      Bucket: bucketName,
      Key: `${prefix}${path.basename(filePath)}`,
      Body: fileStream,
      ContentLength: contentLength
    }
  
    const command = new PutObjectCommand(uploadParams)
  
    try {
      const response = await S3Client.send(command);
      console.log(`File ${prefix}${path.basename(filePath)} uploaded successfully:`)
    } catch (error) {
      console.error(`Error uploading file: ${prefix}${path.basename(filePath)}`, error)
    }
  }
}

//
// upload pdf pages in png format
//
const extractImagesFromPdfUploadToS3 = async (S3Client, filePaths, bucketName, prefix) => {
  for await (let filePath of filePaths) {
    try {
      const fileData = new Uint8Array(await fs.readFile(filePath))
      const pdf = await pdfjsLib.getDocument(filePath, { verbosity: 0 }).promise
      const numPages = pdf.numPages
      const targetDir = path.parse(path.basename(filePath)).name.replace('ARQBR', '')
      let buffer
      let uploadParams
      let uploadCommand

      // create prefix
      const newPrefix = `${prefix}${targetDir}/`
      console.log(`${bucketName}/${prefix}${targetDir}/`)

      // Set up the parameters for the S3 upload
      const createPrefixParams = {
        Bucket: bucketName,
        Key: newPrefix,
        Body: ''
      };
        
      const prefixCommand = new PutObjectCommand(createPrefixParams)

      try {
        const response = await S3Client.send(prefixCommand);
        console.log(`Prefix ${bucketName}/${prefix}${targetDir}/ credated successfully:`)
      } catch (error) {
        console.error(`Error creating prefix: ${bucketName}/${prefix}${targetDir}/`, error)
      }

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1 });
        const canvas = createCanvas(viewport.width, viewport.height);
        const context = canvas.getContext('2d');
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
          canvasFactory: {
            create(width, height) {
              const newCanvas = createCanvas(width, height);
              return {
                canvas: newCanvas,
                context: newCanvas.getContext('2d'),
              };
            },
            reset(canvasAndContext, width, height) {
              canvasAndContext.canvas.width = width;
              canvasAndContext.canvas.height = height;
            },
            destroy(canvasAndContext) {},
          },
        };

        await page.render(renderContext).promise;
        buffer = canvas.toBuffer('image/png');

        const contentLength = buffer.length

        // Set the object key with the specified prefix and page number
        const objectKey = `${prefix}${targetDir}/page_${i.toString().padStart(6, '0')}.png`
        console.log(`${bucketName}/${prefix}${targetDir}/page_${i.toString().padStart(6, '0')}.png`)

        // Set up the parameters for the S3 upload
        uploadParams = {
          Bucket: bucketName,
          Key: objectKey,
          Body: buffer,
          ContentLength: contentLength
        };

        uploadCommand = new PutObjectCommand(uploadParams)

        try {
          await S3Client.send(uploadCommand);
          console.log(`File ${bucketName}/${prefix}${targetDir}/page_${i.toString().padStart(6, '0')}.png uploaded successfully:`)
        } catch (error) {
          console.error(`Error uploading file: ${bucketName}/${prefix}${targetDir}/page_${i.toString().padStart(6, '0')}.png`, error)
        }
      }

      console.log("All pages uploaded successfully.")
    } catch (error) {
      console.error("Error processing PDF:", error)
    }
  }
}

//
// get jwt
//
const getJwt = async () => {
  try {
    const response = await axios.post('https://apiarqbr.vamilly.com/sessions', {
      login: 'admin@arquivobras.com.br',
      password: 'YWRtaW4='
    })

    const jwt = response.data

    return jwt
  } catch (error) {
    console.error('Error retrieving JWT:', error.response.data)
    throw error
  }
}

//
// get customer id
//
const getDepartamentId = async (jwt, departmentCode) => {
  try {
    const payload = {
      identificador: departmentCode
    }

    const response = await axios.post('https://apiarqbr.vamilly.com/sessions', payload, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })

    return response.data
  } catch (error) {
    console.error('Error retrieving data:', error.response.data)
    throw error
  }
}


// -----------------------------------------------------------------
// main routine
// -----------------------------------------------------------------

(async () => {
  const [nomeArquivo, numeroPaginas] = process.argv.slice(2)

  // read .env variables
  dotEnvVars = readDotenvVariables()

  // read csv file with relation of boxes and cost centers
  const costCenterBoxes = await readCostCenterBoxesCsvFile(dotEnvVars.arqbrCostCenterBoxes)

  // reads a list of scanned files from digitalocean spaces S3
  const s3Client = createS3Client(S3Client, dotEnvVars)
  const arquivosPdfFromScanner = await getS3Objects(s3Client, 'vamilly-arqbr', 'arquivos-pdf-scanner/')

    const tempFileKey = `arquivos-pdf-scanner/${nomeArquivo}.pdf`  

    try {
        const fileNameData = extractFileNameData(tempFileKey, costCenterBoxes)
        const documentsBreakStrategies = await getDocumentsBreakStrategies(fileNameData.costCenter, dotEnvVars.arqbrDocumentBreakStrategiesDir)
  
        console.log('>>>>>>>', fileNameData.costCenter, tempFileKey)

        const { textPages, imagePages } = await readPdfFileFromS3(s3Client, 'vamilly-arqbr', 'arquivos-pdf-scanner/', tempFileKey, numeroPaginas)

        // const documentTypes = await analyzeDocumentTypes(textPages, documentsBreakStrategies)

        // console.log(JSON.stringify(documentTypes, null, 4))
        console.log(textPages)
        // return textPages
    } catch (err) {
      console.log('ERRO: ', err)
    }
})()
