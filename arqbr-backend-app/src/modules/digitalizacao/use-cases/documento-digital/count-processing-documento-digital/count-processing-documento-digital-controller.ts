import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountProcessingDocumentoDigitalUseCase } from './count-processing-documento-digital-use-case'

class CountProcessingDocumentoDigitalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user = request.user

    const countProcessingDocumentoDigitalUseCase = container.resolve(CountProcessingDocumentoDigitalUseCase)

    const documentosDigitaisCount = await countProcessingDocumentoDigitalUseCase.execute(user)

    return response.status(documentosDigitaisCount.statusCode).json(documentosDigitaisCount)
  }
}

export { CountProcessingDocumentoDigitalController }
