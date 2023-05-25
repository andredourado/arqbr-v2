import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetCampoDocumentoByTipoDocumentoUseCase } from './get-campo-documento-by-tipo-documento-use-case'

class GetCampoDocumentoByTipoDocumentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { tipoDocumentoId, nomeCampo } = request.body
    const getCampoDocumentoByTipoDocumentoUseCase = container.resolve(GetCampoDocumentoByTipoDocumentoUseCase)
    const campoDocumento = await getCampoDocumentoByTipoDocumentoUseCase.execute({tipoDocumentoId, nomeCampo})

    return response.status(campoDocumento.statusCode).json(campoDocumento.data)
  }
}

export { GetCampoDocumentoByTipoDocumentoController }
