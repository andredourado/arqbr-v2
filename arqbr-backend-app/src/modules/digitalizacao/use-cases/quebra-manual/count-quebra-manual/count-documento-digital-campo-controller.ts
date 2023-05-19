import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountDocumentoDigitalCampoUseCase } from './count-documento-digital-campo-use-case'

class CountDocumentoDigitalCampoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countDocumentoDigitalCampoUseCase = container.resolve(CountDocumentoDigitalCampoUseCase)

    const documentosDigitaisCamposCount = await countDocumentoDigitalCampoUseCase.execute({
      search: search as string
    })

    return response.status(documentosDigitaisCamposCount.statusCode).json(documentosDigitaisCamposCount)
  }
}

export { CountDocumentoDigitalCampoController }
