import { injectable } from 'tsyringe'
import { HttpResponse, ok } from '@shared/helpers/http'
import { extractTextsS3 } from '@utils/extract-texts'

interface IRequest {
  nomeArquivo: string,
  page?: number
}

@injectable()
class ExtracaoS3DocumentoDigitalUseCase {
  constructor() { }
  async execute({
    nomeArquivo,
    page = 1
  }: IRequest): Promise<HttpResponse> {
    const text = await extractTextsS3(nomeArquivo, page, 'arquivos-pdf-scanner')

    return ok(text)
  }
}

export { ExtracaoS3DocumentoDigitalUseCase }
