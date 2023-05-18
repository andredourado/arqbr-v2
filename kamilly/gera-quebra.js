const { S3Client, ListObjectsV2Command, GetObjectCommand } = require("@aws-sdk/client-s3");
const { promises: fs, writeFileSync, readFileSync, createWriteStream } = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid');

//
// generate a uuid v4
//
const generateUUID = () => {
  const uuid = uuidv4();
  return uuid;
}

//
// reads csv with boxes x cost centers
//
const readDocumentsCsvFile = (csvFilePath) => {
  try {
    const data = readFileSync(csvFilePath, 'utf-8')
    const lines = data.split('\n')
    const obj = []

    for (const line of lines) {
      const [ 
        document_code, 
        document_description,
        quebra
      ] = line.split(';')

      obj.push(`
        ${document_code};
        ${document_description};
        ${quebra};`
      )
    }

    return obj
  } catch (error) {
    console.error(`Error reading file: ${csvFilePath}. ${error}`)
    
    return null
  }
}

//
// write textfile informing documents array and file name
//
const writeSeedFiles = async (documents, documentsFilePath, fieldsFilePath) => {
  let documentsOutput = ''

  try {
    for await ( let document of documents) {
      const documentUUID = generateUUID()

      const [
        document_code, 
        document_description,
        quebra
      ] = document.split(';')

      if (cost_center.trim() !== '') {
        documentsOutput += `('${documentUUID}',`
        documentsOutput += ` '27cff971-6f84-41d8-926c-d209b30df79b',`
        documentsOutput += ` 'departamento',`
        documentsOutput += ` '${document_description.trim().replace('\n', '')}',` 
        documentsOutput += ` '${document_code.trim().replace('\n', '')}',` 
        documentsOutput += ` '${quebra.trim().replace('\n', '')}',` 
        documentsOutput += ` '', false, 'now()', 'now()'),\n` 

      }
    }

    await fs.writeFile(documentsFilePath, documentsOutput, (err) => {
      if (err) {
        console.error('Error writing to file:', err);
      }
    }) 
  } catch (error) {
    console.error(`Error writing file: ${filePath}. ${error}`)
    
    return null
  }
}


// -----------------------------------------------------------------
// main routine
// -----------------------------------------------------------------

(async () => {
  // read csv files
  const documents = await readDocumentsCsvFile('./quebra.csv')

  writeSeedFiles(documents, './quebra.txt')
})()
