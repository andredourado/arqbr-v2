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
        quebra,
        field_name_1,
        field_title_1,
        field_strategy_1,
        field_name_2,
        field_title_2,
        field_strategy_2,
        field_name_3,
        field_title_3,
        field_strategy_3
      ] = line.split(';')

      obj.push(`
        ${document_code.trim().replace('\n', '')};
        ${document_description.trim().replace('\n', '')};
        ${quebra.trim().replace('\n', '')};
        ${field_name_1 === undefined ? '-' : field_name_1.trim().replace('\n', '')};
        ${field_title_1 === undefined ? '-' : field_title_1.trim().replace('\n', '')};
        ${field_strategy_1 === undefined ? '-' : field_strategy_1.trim().replace('\n', '')};
        ${field_name_2 === undefined ? '-' : field_name_2.trim().replace('\n', '')};
        ${field_title_2 === undefined ? '-' : field_title_2.trim().replace('\n', '')};
        ${field_strategy_2 === undefined ? '-' : field_strategy_2.trim().replace('\n', '')};
        ${field_name_3 === undefined ? '-' : field_name_3.trim().replace('\n', '')};
        ${field_title_3 === undefined ? '-' : field_title_3.trim().replace('\n', '')};
        ${field_strategy_3 === undefined ? '-' : field_strategy_3.trim().replace('\n', '')}`
      )
    }

    return obj
  } catch (error) {
    console.error(`Error reading file: ${csvFilePath}. ${error}`)
    
    return null
  }
}

//
// ????
//
const fieldsToObject = async (fields) => {
  let output = []

  for await (let field of fields) {
    const parts = field.split(';')

    const tempObject = {
      key: parts[1].trim(),
      line: field.trim()
    }

    output.push(tempObject)
  }

  return output
}

//
// write textfile informing documents array and file name
//
const writeSeedFiles = async (documents, fields, documentsFilePath, fieldsFilePath) => {
  let documentsOutput = ''
  let fieldsOutput = ''
  const departaments = {
    '1025011034': 'b0b0a92b-0519-4b8d-893e-3a981852cddc',
    '1025011025': '9ee9bffe-ba28-4b28-aad9-ddb15232130a',
    '1025011015': 'a82280dc-85cc-45b3-8253-69919b0df1d7'
  }

  const documentFields = await fieldsToObject(fields)
  console.log(documentFields)
  return

  try {
    for await ( let document of documents) {
      const documentUUID = generateUUID()

      const [
        document_code, 
        document_description,
        quebra,
        field_definition_1,
        field_definition_2,
        field_definition_3,
      ] = document.split(';')

      cost_center = document_code.trim().substr(6, 10)

      if (cost_center.trim() !== '') {
        const splitted_field_definition_1 = field_definition_1.trim().replace('\n', '').split('|')
        const splitted_field_definition_2 = field_definition_2.trim().replace('\n', '').split('|')
        const splitted_field_definition_3 = field_definition_3.trim().replace('\n', '').split('|')

        const field_name_1 = splitted_field_definition_1[0]
        const field_title_1 = splitted_field_definition_1[1]
        const field_strategy_1 = splitted_field_definition_1[2]

        const field_name_2 = splitted_field_definition_2[0]
        const field_title_2 = splitted_field_definition_2[1]
        const field_strategy_2 = splitted_field_definition_2[2]

        const field_name_3 = splitted_field_definition_3[0]
        const field_title_3 = splitted_field_definition_3[1]
        const field_strategy_3 = splitted_field_definition_3[2]

        tempDocumentsOutput = ''
        tempDocumentsOutput += `('${documentUUID}',`
        tempDocumentsOutput += ` '27cff971-6f84-41d8-926c-d209b30df79b',`
        tempDocumentsOutput += ` '${departaments[cost_center]}',`
        tempDocumentsOutput += ` '${document_description.trim()}',` 
        tempDocumentsOutput += ` '${document_code.trim()}',` 
        tempDocumentsOutput += ` '${quebra.trim()}',` 
        tempDocumentsOutput += ` '', false, 'now()', 'now()'),\n` 

        documentsOutput += tempDocumentsOutput.replace('\n', '') + '\n'

        fieldsOutput += `${generateUUID()},`
        fieldsOutput += ` '${documentUUID}',`
        fieldsOutput += ` '${field_name_1}',`
        fieldsOutput += ` '${field_title_1}',`
        fieldsOutput += ` '${field_strategy_1}',`
        fieldsOutput += ` '', '', false, 'now()', 'now()'),\n`

        fieldsOutput += `${generateUUID()},`
        fieldsOutput += ` '${documentUUID}',`
        fieldsOutput += ` '${field_name_2}',`
        fieldsOutput += ` '${field_title_2}',`
        fieldsOutput += ` '${field_strategy_2}',`
        fieldsOutput += ` '', '', false, 'now()', 'now()'),\n`

        fieldsOutput += `${generateUUID()},`
        fieldsOutput += ` '${documentUUID}',`
        fieldsOutput += ` '${field_name_3}',`
        fieldsOutput += ` '${field_title_3}',`
        fieldsOutput += ` '${field_strategy_3}',`
        fieldsOutput += ` '', '', false, 'now()', 'now()'),\n`
      }
    }

    await fs.writeFile(documentsFilePath, documentsOutput, (err) => {
      if (err) {
        console.error('Error writing to file:', err);
      }
    }) 

    await fs.writeFile(fieldsFilePath, fieldsOutput, (err) => {
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
  const fields = await readDocumentsCsvFile('./campos.csv')

  console.log(fields)
  return

  writeSeedFiles(documents, fields, './tipo_documento.txt', './tipo_documento_campos.txt')
})()
