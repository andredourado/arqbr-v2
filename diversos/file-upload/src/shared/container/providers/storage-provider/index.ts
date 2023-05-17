import { container } from 'tsyringe'
import { S3DigitalOceanStorageProvider } from './implementations/s3-digital-ocean-storage-provider'
import { IStorageProvider } from './i-storage-provider'

const diskStorage = {
  s3DigitalOcean: S3DigitalOceanStorageProvider
}

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  diskStorage[process.env.disk]
)
