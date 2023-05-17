import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateVersaoDocumentoUseCase } from './update-versao-documento-use-case'

class UpdateVersaoDocumentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      clienteId,
      contratoId,
      departamentoId,
      tipoDocumentoId,
      descricaoVersao,
      qrcode,
      campos,
      file,
      pageQuantity,
      desabilitado
    } = request.body

    const { id } = request.params

    const updateVersaoDocumentoUseCase = container.resolve(UpdateVersaoDocumentoUseCase)

    const result = await updateVersaoDocumentoUseCase.execute({
        id,
        clienteId,
        contratoId,
        departamentoId,
        tipoDocumentoId,
        descricaoVersao,
        qrcode,
        campos,
        file,
        pageQuantity,
        desabilitado
      })
      .then(versaoDocumentoResult => {
        return versaoDocumentoResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdateVersaoDocumentoController }
