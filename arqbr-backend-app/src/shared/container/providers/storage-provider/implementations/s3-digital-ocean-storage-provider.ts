import { Endpoint, S3 } from 'aws-sdk'
import fs from 'fs'
import mime from 'mime'
import { resolve } from 'path'
import upload from '@config/upload'
import { IStorageProvider } from '../i-storage-provider'
import { log } from 'handlebars'

class S3DigitalOceanStorageProvider implements IStorageProvider {
  private client: S3

  constructor() {
    this.client = new S3({
      endpoint: new Endpoint('nyc3.digitaloceanspaces.com'),
      region: process.env.AWS_BUCKET_REGION,
    })
  }

  async save(file: string, folder: string): Promise<string> {
    const originalName = resolve(upload.tmpFolder, file)

    const fileContent = await fs.promises.readFile(originalName)

    const ContentType = mime.getType(originalName)

    await this.client
      .putObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
      })
      .promise()

    await fs.promises.unlink(originalName)

    return file
  }

  get url(): string {
    return process.env.AWS_BUCKET_URL
  }

  async load(file: string, folder: string): Promise<any> {
    const params = {
      Bucket: `${process.env.AWS_BUCKET}/${folder}`,
      Key: file,
    }
    
    const image = await new Promise((resolve, reject) => {
      this.client.getObject(params, (err, data) => {
        if (err) {
          reject(err)
        } else {
          const base64Data = data.Body.toString('base64')
          const mimeType = data.ContentType
          resolve(`data:${mimeType};base64,${base64Data}`)
        }
      })
    })

    // console.log(image)
    return image
  }

  async numberPages(folder: string): Promise<number> {
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Prefix: folder
    }
    
    const numberPages: number = await new Promise((resolve, reject) => {
      this.client.listObjectsV2(params, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data.Contents.length)
        }
      })
    })

    return numberPages
  }

  async delete(file: string, folder: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: file,
      })
      .promise()
  }
}

export { S3DigitalOceanStorageProvider }
