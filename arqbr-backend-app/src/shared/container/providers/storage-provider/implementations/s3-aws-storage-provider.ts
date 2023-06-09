import { S3 } from 'aws-sdk'
import fs from 'fs'
import mime from 'mime'
import { resolve } from 'path'
import upload from '@config/upload'
import { IStorageProvider } from '../i-storage-provider'

class S3AwsStorageProvider implements IStorageProvider {
  private client: S3

  constructor() {
    this.client = new S3({
      region: process.env.AWS_BUCKET_REGION,
    })
  }
  numberPages(folder: string): Promise<number> {
    throw new Error('Method not implemented.')
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

  async load(file: string, folder: string): Promise<string> {
    throw new Error('Method not implemented.')
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

export { S3AwsStorageProvider }
