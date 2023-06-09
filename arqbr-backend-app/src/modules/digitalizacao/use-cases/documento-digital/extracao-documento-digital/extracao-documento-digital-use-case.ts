import { injectable } from 'tsyringe'
import { HttpResponse, ok } from '@shared/helpers/http'
import { extractTexts } from '@utils/extract-texts'

interface IRequest {
  file: string
  fileName?: string
  page?: number
}

@injectable()
class ExtracaoDocumentoDigitalUseCase {
  constructor() { }
  async execute({
    file,
    fileName,
    page = 1
  }: IRequest): Promise<HttpResponse> {
    const text = await extractTexts(fileName ?? file, page)

    return ok(text)
  }
}

export { ExtracaoDocumentoDigitalUseCase }
