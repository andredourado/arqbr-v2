import { inject, injectable } from 'tsyringe'
import { IStorageProvider } from '@shared/container/providers/storage-provider/i-storage-provider'
import { IVersaoDocumentoRepository } from '@modules/digitalizacao/repositories/i-versao-documento-repository'

interface IRequest {
  versaoDocumentoId: string
  file: string
}

@injectable()
class UpdateVersaoDocumentoFileUseCase {
  constructor(
    @inject('VersaoDocumentoRepository')
    private versaoDocumentoRepository: IVersaoDocumentoRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute({ versaoDocumentoId, file }: IRequest): Promise<void> {
    const versaoDocumento = await this.versaoDocumentoRepository.get(versaoDocumentoId)

    if (versaoDocumento.data.file) {
      await this.storageProvider.delete(versaoDocumento.data.file, 'file')
    }
    await this.storageProvider.save(file, 'file')

    versaoDocumento.data.file = file

    await this.versaoDocumentoRepository.update(versaoDocumento.data)
  }
}

export { UpdateVersaoDocumentoFileUseCase }
