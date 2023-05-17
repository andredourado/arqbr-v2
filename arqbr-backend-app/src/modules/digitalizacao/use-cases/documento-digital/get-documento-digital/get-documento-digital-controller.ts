import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetDocumentoDigitalUseCase } from './get-documento-digital-use-case'

class GetDocumentoDigitalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getDocumentoDigitalUseCase = container.resolve(GetDocumentoDigitalUseCase)
    const documentoDigital = await getDocumentoDigitalUseCase.execute(id)

    return response.status(documentoDigital.statusCode).json(documentoDigital.data)
  }
}

export { GetDocumentoDigitalController }
