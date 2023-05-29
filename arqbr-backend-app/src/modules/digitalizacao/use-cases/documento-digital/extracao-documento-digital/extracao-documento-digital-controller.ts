import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ExtracaoDocumentoDigitalUseCase } from './extracao-documento-digital-use-case'

class ExtracaoDocumentoDigitalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      id,
      page,
      conteudoEmTexto
    } = request.body

    const extracaoDocumentoDigitalUseCase = container.resolve(ExtracaoDocumentoDigitalUseCase)

    const image = await extracaoDocumentoDigitalUseCase.execute({
      id: id as string,
      page: Number(page) as number,
      conteudoEmTexto: conteudoEmTexto as string
    })

    return response.status(image.statusCode).json(image)
  }
}

export { ExtracaoDocumentoDigitalController }