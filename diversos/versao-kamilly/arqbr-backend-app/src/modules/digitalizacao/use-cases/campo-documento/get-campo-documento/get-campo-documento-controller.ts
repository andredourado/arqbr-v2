import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetCampoDocumentoUseCase } from './get-campo-documento-use-case'

class GetCampoDocumentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getCampoDocumentoUseCase = container.resolve(GetCampoDocumentoUseCase)
    const campoDocumento = await getCampoDocumentoUseCase.execute(id)

    return response.status(campoDocumento.statusCode).json(campoDocumento.data)
  }
}

export { GetCampoDocumentoController }
