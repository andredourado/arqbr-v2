import { Endpoint, S3 } from 'aws-sdk'
import fs from 'fs'
import mime from 'mime'
import { resolve } from 'path'
import { tmpFolder } from '@config/upload'
import { IStorageProvider } from '../i-storage-provider'

class S3DigitalOceanStorageProvider implements IStorageProvider {
  private client: S3

  constructor() {
    this.client = new S3({
      endpoint: new Endpoint('nyc3.digitaloceanspaces.com'),
      region: process.env.AWS_BUCKET_REGION,
    })
  }

  async save(file: string, folder: string): Promise<string> {
    const originalName = resolve(tmpFolder, file)

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

    return file
  }

  get url(): string {
    return process.env.AWS_BUCKET_URL
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
