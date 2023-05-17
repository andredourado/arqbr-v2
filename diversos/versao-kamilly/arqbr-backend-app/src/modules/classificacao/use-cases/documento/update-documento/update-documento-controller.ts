import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateDocumentoUseCase } from './update-documento-use-case'

class UpdateDocumentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      clienteId,
      contratoId,
      departamentoId,
      tipoDocumentoId,
      nip,
      caixaArqbr,
      conteudoQrCode,
      statusId,
      pessoaId
    } = request.body

    const { id } = request.params

    const updateDocumentoUseCase = container.resolve(UpdateDocumentoUseCase)

    const result = await updateDocumentoUseCase.execute({
        id,
        clienteId,
        contratoId,
        departamentoId,
        tipoDocumentoId,
        nip,
        caixaArqbr,
        conteudoQrCode,
        statusId,
        pessoaId
      })
      .then(documentoResult => {
        return documentoResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdateDocumentoController }
