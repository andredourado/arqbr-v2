const AWS = require("aws-sdk"),
      {
        S3
      } = require("@aws-sdk/client-s3");
const fs = require("fs")
const dotenv = require("dotenv")

dotenv.config()
const spacesEndpoint = new AWS.Endpoint(process.env.DO_SPACES_ENDPOINT)
const s3 = new S3(
  {endpoint: spacesEndpoint, accessKeyId: process.env.DO_SPACES_KEY, secretAccessKey: process.env.DO_SPACES_SECRET}
)

const params = {
  Bucket: 'vamilly-arqbr',
  Prefix: 'arquivos-pdf-separados/'
};

s3.listObjectsV2(params, (err, data) => {
  if (err) {
      console.log(err);
  } else {
    const files = data.Contents

    files.forEach(file => {
      if (file.Size !== 312) {
        console.log(file.Size.toString().padStart(20, '0') + ';' + file.Key.replace('arquivos-pdf-separados/', ''))
      }
    });  
  }
});