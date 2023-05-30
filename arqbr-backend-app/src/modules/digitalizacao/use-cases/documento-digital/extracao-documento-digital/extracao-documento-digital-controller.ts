import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ExtracaoDocumentoDigitalUseCase } from './extracao-documento-digital-use-case'

class ExtracaoDocumentoDigitalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      nomeArquivo,
      numeroPaginas
    } = request.body

    const extracaoDocumentoDigitalUseCase = container.resolve(ExtracaoDocumentoDigitalUseCase)

    const image = await extracaoDocumentoDigitalUseCase.execute({
      nomeArquivo,
      numeroPaginas
    })

    return response.status(image.statusCode).json(image)
  }
}

export { ExtracaoDocumentoDigitalController }