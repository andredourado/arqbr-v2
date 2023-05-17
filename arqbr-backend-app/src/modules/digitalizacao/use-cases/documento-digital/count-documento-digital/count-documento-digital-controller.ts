import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountDocumentoDigitalUseCase } from './count-documento-digital-use-case'

class CountDocumentoDigitalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      filter,
      tipoDocumentoId
    } = request.body

    const user = request.user

    const countDocumentoDigitalUseCase = container.resolve(CountDocumentoDigitalUseCase)

    const documentosDigitaisCount = await countDocumentoDigitalUseCase.execute({
      search: search as string,
      filter: filter as any,
      tipoDocumentoId: tipoDocumentoId as string,
      user
    })

    return response.status(documentosDigitaisCount.statusCode).json(documentosDigitaisCount)
  }
}

export { CountDocumentoDigitalController }
