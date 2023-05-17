import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetPdfDocumentoDigitalUseCase } from './get-pdf-documento-digital-use-case'

class GetPdfDocumentoDigitalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.body

    const getPdfDocumentoDigitalUseCase = container.resolve(GetPdfDocumentoDigitalUseCase)

    const image = await getPdfDocumentoDigitalUseCase.execute({
      id: id as string
    })

    return response.status(image.statusCode).json(image)
  }
}

export { GetPdfDocumentoDigitalController }