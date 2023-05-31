import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ExtracaoDocumentoDigitalUseCase } from './extracao-documento-digital-use-case'

class ExtracaoDocumentoDigitalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { fileName, page } = request.body

    let file: string
    if (!fileName) {
      file = request.file.filename
    }

    const extracaoDocumentoDigitalUseCase = container.resolve(ExtracaoDocumentoDigitalUseCase)

    const image = await extracaoDocumentoDigitalUseCase.execute({
      file,
      fileName,
      page
    })

    return response.status(image.statusCode).json(image)
  }
}

export { ExtracaoDocumentoDigitalController }