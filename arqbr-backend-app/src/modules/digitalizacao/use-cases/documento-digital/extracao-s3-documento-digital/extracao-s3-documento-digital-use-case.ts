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
    const regex = /\.(png|pdf|txt|jpg)$/i
    const nomeArquivoSemExtensao = nomeArquivo.replace(regex, '')
    const text = await extractTextsS3(`${nomeArquivoSemExtensao}.pdf`, page, 'arquivos-pdf-scanner')

    return ok(text)
  }
}

export { ExtracaoS3DocumentoDigitalUseCase }
