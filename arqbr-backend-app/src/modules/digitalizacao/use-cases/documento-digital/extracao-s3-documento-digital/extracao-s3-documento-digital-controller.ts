import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ExtracaoS3DocumentoDigitalUseCase } from './extracao-s3-documento-digital-use-case'

class ExtracaoS3DocumentoDigitalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      nomeArquivo,
      page
    } = request.body

    const extracaoDocumentoDigitalUseCase = container.resolve(ExtracaoS3DocumentoDigitalUseCase)

    const image = await extracaoDocumentoDigitalUseCase.execute({
      nomeArquivo,
      page
    })

    return response.status(image.statusCode).json(image)
  }
}

export { ExtracaoS3DocumentoDigitalController }