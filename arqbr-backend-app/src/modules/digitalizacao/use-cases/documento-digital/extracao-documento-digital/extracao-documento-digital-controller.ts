import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ExtracaoDocumentoDigitalUseCase } from './extracao-documento-digital-use-case'

class ExtracaoDocumentoDigitalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      nomeArquivo,
      page
    } = request.body

    const extracaoDocumentoDigitalUseCase = container.resolve(ExtracaoDocumentoDigitalUseCase)

    const image = await extracaoDocumentoDigitalUseCase.execute({
      nomeArquivo,
      page
    })

    return response.status(image.statusCode).json(image)
  }
}

export { ExtracaoDocumentoDigitalController }