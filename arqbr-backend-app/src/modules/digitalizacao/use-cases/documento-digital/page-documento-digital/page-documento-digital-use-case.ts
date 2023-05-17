import { inject, injectable } from 'tsyringe'
import { IVersaoDocumentoRepository } from '@modules/digitalizacao/repositories/i-versao-documento-repository'
import { HttpResponse, ok } from '@shared/helpers/http'
import { IStorageProvider } from '@shared/container/providers/storage-provider/i-storage-provider'
import { IDocumentoDigitalRepository } from '@modules/digitalizacao/repositories/i-documento-digital-repository'

interface IRequest {
  id: string
  page: number
}

@injectable()
class PageDocumentoDigitalUseCase {
  constructor(
    @inject('DocumentoDigitalRepository')
    private documentoDigitalRepository: IDocumentoDigitalRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) { }
  async execute({
    id,
    page = 0
  }: IRequest): Promise<HttpResponse> {
    const documentoDigital = await this.documentoDigitalRepository.get(id)
    console.log(documentoDigital)

    const newPage = 'page_' + String(page).padStart(6, '0') + '.png'
    const url = 'arquivos-pdf-paginas/' + documentoDigital.data.nomeArquivo.replace(/\.[^/.]+$/, "")
    const image = await this.storageProvider.load(newPage, url)

    const response = {
      image, 
      totalPages: documentoDigital.data.numeroPaginas, 
      nomeArquivo: documentoDigital.data.nomeArquivo,
      solicitacaoFisico: documentoDigital.data.solicitacaoFisico
    }
    
    return ok(response)
  }
}

export { PageDocumentoDigitalUseCase }
