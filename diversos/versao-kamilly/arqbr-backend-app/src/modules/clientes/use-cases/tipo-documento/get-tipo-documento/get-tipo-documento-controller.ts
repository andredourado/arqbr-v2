import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetTipoDocumentoUseCase } from './get-tipo-documento-use-case'

class GetTipoDocumentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getTipoDocumentoUseCase = container.resolve(GetTipoDocumentoUseCase)
    const tipoDocumento = await getTipoDocumentoUseCase.execute(id)

    return response.status(tipoDocumento.statusCode).json(tipoDocumento.data)
  }
}

export { GetTipoDocumentoController }
