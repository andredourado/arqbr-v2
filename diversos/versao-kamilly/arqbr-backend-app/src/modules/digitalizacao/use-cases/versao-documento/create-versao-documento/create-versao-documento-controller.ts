import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateVersaoDocumentoUseCase } from './create-versao-documento-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateVersaoDocumentoController {
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

    const createVersaoDocumentoUseCase = container.resolve(CreateVersaoDocumentoUseCase)

    const result = await createVersaoDocumentoUseCase.execute({
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

export { CreateVersaoDocumentoController }
