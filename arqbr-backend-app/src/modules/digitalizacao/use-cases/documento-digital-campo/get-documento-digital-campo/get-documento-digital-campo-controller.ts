import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetDocumentoDigitalCampoUseCase } from './get-documento-digital-campo-use-case'

class GetDocumentoDigitalCampoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getDocumentoDigitalCampoUseCase = container.resolve(GetDocumentoDigitalCampoUseCase)
    const documentoDigitalCampo = await getDocumentoDigitalCampoUseCase.execute(id)

    return response.status(documentoDigitalCampo.statusCode).json(documentoDigitalCampo.data)
  }
}

export { GetDocumentoDigitalCampoController }
