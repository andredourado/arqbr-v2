import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountPagesDocumentoDigitalUseCase } from './count-pages-documento-digital-use-case'

class CountPagesDocumentoDigitalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user = request.user

    const countPagesDocumentoDigitalUseCase = container.resolve(CountPagesDocumentoDigitalUseCase)

    const countPages = await countPagesDocumentoDigitalUseCase.execute({
      user
    })

    return response.status(countPages.statusCode).json(countPages)
  }
}

export { CountPagesDocumentoDigitalController }
