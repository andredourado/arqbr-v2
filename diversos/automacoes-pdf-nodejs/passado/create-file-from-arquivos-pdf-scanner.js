const AWS = require("aws-sdk")
const fs = require("fs")
const dotenv = require("dotenv")

dotenv.config()
const spacesEndpoint = new AWS.Endpoint(process.env.DO_SPACES_ENDPOINT)
const s3 = new AWS.S3({endpoint: spacesEndpoint, accessKeyId: process.env.DO_SPACES_KEY, secretAccessKey: process.env.DO_SPACES_SECRET})

const params = {
  Bucket: 'vamilly-arqbr',
  Prefix: 'arquivos-pdf-scanner/'
}

s3.listObjectsV2(params, (err, data) => {
  if (err) {
      console.log(err)
  } else {
    const files = data.Contents
    const fileData = []

    files.forEach(file => {
      if (file.Key.includes('.pdf')) {
        // fileData.push(file.Size.toString().padStart(20, '0') + ';' + file.Key.replace('arquivos-pdf-scanner/', ''))
        fileData.push(file.Key.replace('arquivos-pdf-scanner/', ''))
      }
    })  

    const fileContent = fileData.join('\n')
    const fileName = 'already-splitted-files.txt'
    const bucketName = 'vamilly-arqbr'
    const prefix = 'arquivos-pdf-scanner/'

    console.log(fileContent)

    const params = {
      Bucket: bucketName,
      Key: prefix + fileName,
      Body: fileContent
    }

    // S3 ManagedUpload with callbacks are not supported in AWS SDK for JavaScript (v3).
    // Please convert to `await client.upload(params, options).promise()`, and re-run aws-sdk-js-codemod.
    s3.upload(params, (err, data) => {
      if (err) {
        console.error(err)
      } else {
        console.log(`File uploaded successfully to ${bucketName}/arquivos-pdf-scanner/${fileName}`)
      }
    })
  }
})
