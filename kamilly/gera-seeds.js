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
        cost_center, 
        document_code, 
        document_description,
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
        ${cost_center};
        ${document_code};
        ${document_description};
        ${field_name_1};
        ${field_title_1};
        ${field_strategy_1};
        ${field_name_2};
        ${field_title_2};
        ${field_strategy_2};
        ${field_name_3};
        ${field_title_3};
        ${field_strategy_3}`
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
  let fieldsOutput = ''

  try {
    for await ( let document of documents) {
      const documentUUID = generateUUID()

      const [
        cost_center, 
        document_code, 
        document_description,
        field_definition_1,
        field_definition_2,
        field_definition_3,
      ] = document.split(';')

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

        documentsOutput += `('${documentUUID}',`
        documentsOutput += ` '27cff971-6f84-41d8-926c-d209b30df79b',`
        documentsOutput += ` 'departamento',`
        documentsOutput += ` '${document_description.trim().replace('\n', '')}',` 
        documentsOutput += ` '${document_code.trim().replace('\n', '')}',),` 
        documentsOutput += ` '', false, 'now()', 'now()'),\n` 

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

  writeSeedFiles(documents, './quebra.txt', './campos.txt')
})()
