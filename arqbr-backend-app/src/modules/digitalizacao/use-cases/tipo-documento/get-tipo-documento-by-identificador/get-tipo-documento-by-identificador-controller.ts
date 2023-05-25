import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetTipoDocumentoByIdentificadorUseCase } from './get-tipo-documento-by-identificador-use-case'

class GetTipoDocumentoByIdentificadorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const identificador = request.params.identificador
    const getTipoDocumentoByIdentificadorUseCase = container.resolve(GetTipoDocumentoByIdentificadorUseCase)
    const tipoDocumento = await getTipoDocumentoByIdentificadorUseCase.execute(identificador)

    return response.status(tipoDocumento.statusCode).json(tipoDocumento.data)
  }
}

export { GetTipoDocumentoByIdentificadorController }
