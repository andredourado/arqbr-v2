const { promises: fs, readFileSync } = require('fs')
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

      obj.push(`${document_code};${document_description};${quebra};`)
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
const writeSeedFiles = async (documents, documentsFilePath) => {
  let documentsOutput = ''
  const departaments = {
    '1025011034': 'b0b0a92b-0519-4b8d-893e-3a981852cddc',
    '1025011025': '9ee9bffe-ba28-4b28-aad9-ddb15232130a',
    '1025011015': 'a82280dc-85cc-45b3-8253-69919b0df1d7'
  }

  try {
    for await ( let document of documents) {
      const documentUUID = generateUUID()

      const [ 
        document_code, 
        document_description,
        quebra
      ] = document.split(';')

      cost_center = document_code.substr(6, 10)

      if (document.document_description !== '') {
        documentsOutput += `('${documentUUID}',`
        documentsOutput += ` '27cff971-6f84-41d8-926c-d209b30df79b',`
        documentsOutput += ` '${departaments[cost_center]}',`
        documentsOutput += ` '${document_description}',` 
        documentsOutput += ` '${document_code}',` 
        documentsOutput += ` '${quebra}',` 
        documentsOutput += ` '', false, 'now()', 'now()'),\n` 
      }
    }

    await fs.writeFile(documentsFilePath, documentsOutput, (err) => {
      if (err) {
        console.error('Error writing to file:', err);
      }
    }) 
  } catch (error) {
    console.error(`Error writing file: ${documentsFilePath}. ${error}`)
    
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
