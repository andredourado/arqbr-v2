import { inject, injectable } from 'tsyringe'
import { IStorageProvider } from '@shared/container/providers/storage-provider/i-storage-provider'

interface IRequest {
  fileName: string
  targetDirectory: string
}

@injectable()
class UploadFileUseCase {
  constructor(
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute({ fileName, targetDirectory }: IRequest): Promise<void> {
    console.log(fileName, targetDirectory)
    await this.storageProvider.save(fileName, targetDirectory)
      .catch(err => console.log(err))
  }
}

export { UploadFileUseCase }
