import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { PageDocumentoDigitalUseCase } from './page-documento-digital-use-case'

class PageDocumentoDigitalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      id,
      page
    } = request.body

    const pageDocumentoDigitalUseCase = container.resolve(PageDocumentoDigitalUseCase)

    const image = await pageDocumentoDigitalUseCase.execute({
      id: id as string,
      page: Number(page) as number
    })

    return response.status(image.statusCode).json(image)
  }
}

export { PageDocumentoDigitalController }