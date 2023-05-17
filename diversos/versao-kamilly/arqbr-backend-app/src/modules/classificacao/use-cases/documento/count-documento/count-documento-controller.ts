import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountDocumentoUseCase } from './count-documento-use-case'

class CountDocumentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countDocumentoUseCase = container.resolve(CountDocumentoUseCase)

    const documentosCount = await countDocumentoUseCase.execute({
      search: search as string
    })

    return response.status(documentosCount.statusCode).json(documentosCount)
  }
}

export { CountDocumentoController }
