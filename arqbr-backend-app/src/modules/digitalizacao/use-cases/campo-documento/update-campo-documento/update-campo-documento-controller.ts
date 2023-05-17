import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateCampoDocumentoUseCase } from './update-campo-documento-use-case'

class UpdateCampoDocumentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      tipoDocumentoId,
      nomeCampo,
      titulo,
      metodoExtracao,
      desabilitado
    } = request.body

    const { id } = request.params

    const updateCampoDocumentoUseCase = container.resolve(UpdateCampoDocumentoUseCase)

    const result = await updateCampoDocumentoUseCase.execute({
        id,
        tipoDocumentoId,
        nomeCampo,
        titulo,
        metodoExtracao,
        desabilitado
      })
      .then(campoDocumentoResult => {
        return campoDocumentoResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdateCampoDocumentoController }
