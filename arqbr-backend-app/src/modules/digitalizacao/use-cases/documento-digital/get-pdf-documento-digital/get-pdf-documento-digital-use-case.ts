import { inject, injectable } from 'tsyringe'
import { HttpResponse, ok } from '@shared/helpers/http'
import { IStorageProvider } from '@shared/container/providers/storage-provider/i-storage-provider'
import { IDocumentoDigitalRepository } from '@modules/digitalizacao/repositories/i-documento-digital-repository'

interface IRequest {
  id: string
}

@injectable()
class GetPdfDocumentoDigitalUseCase {
  constructor(
    @inject('DocumentoDigitalRepository')
    private documentoDigitalRepository: IDocumentoDigitalRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) { }
  async execute({
    id
  }: IRequest): Promise<HttpResponse> {
    const documentoDigital = await this.documentoDigitalRepository.get(id)

    const url = 'arquivos-pdf-separados'
    const filename = documentoDigital.data.nomeArquivo

    const file = await this.storageProvider.load(filename, url)
    
    return ok(file)
  }
}

export { GetPdfDocumentoDigitalUseCase }
