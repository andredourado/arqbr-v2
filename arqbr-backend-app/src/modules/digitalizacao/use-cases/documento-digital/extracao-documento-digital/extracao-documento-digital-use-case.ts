import { injectable } from 'tsyringe'
import { HttpResponse, ok } from '@shared/helpers/http'
import { extractTexts } from '@utils/extract-texts'

interface IRequest {
  nomeArquivo: string,
  page?: number
}

@injectable()
class ExtracaoDocumentoDigitalUseCase {
  constructor() { }
  async execute({
    nomeArquivo,
    page = 1
  }: IRequest): Promise<HttpResponse> {
    const text = await extractTexts(nomeArquivo, page, 'arquivos-pdf-scanner')

    return ok(text)
  }
}

export { ExtracaoDocumentoDigitalUseCase }
