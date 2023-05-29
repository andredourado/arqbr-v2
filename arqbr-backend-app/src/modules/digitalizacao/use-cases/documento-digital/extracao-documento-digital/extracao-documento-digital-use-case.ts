import { inject, injectable } from 'tsyringe'
import { HttpResponse, ok } from '@shared/helpers/http'
import { IStorageProvider } from '@shared/container/providers/storage-provider/i-storage-provider'
import { IDocumentoDigitalRepository } from '@modules/digitalizacao/repositories/i-documento-digital-repository'

interface IRequest {
  id: string
  page: number
  conteudoEmTexto: string
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
    page = 0,
  }: IRequest): Promise<HttpResponse> {
    const documentoDigital = await this.documentoDigitalRepository.get(id)
    if (documentoDigital.statusCode != 200) {
      return documentoDigital
    }

    const newPage = 'page_' + String(page).padStart(6, '0') + '.png'
    const url = 'arquivos-pdf-paginas/' + documentoDigital?.data?.nomeArquivo?.replace(/\.[^/.]+$/, "").replace("ARQBR", "")
    console.log(url)
    const image = await this.storageProvider.load(newPage, url)

    const response = {
      image, 
      totalPages: documentoDigital.data.numeroPaginas, 
      nomeArquivo: documentoDigital.data.nomeArquivo,
      solicitacaoFisico: documentoDigital.data.solicitacaoFisico,
      conteudoEmTexto: documentoDigital.data.conteudoEmTexto
    }
    
    return ok(response)
  }
}

export { PageDocumentoDigitalUseCase }
