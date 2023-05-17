import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateDocumentoUseCase } from './create-documento-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateDocumentoController {
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

    const createDocumentoUseCase = container.resolve(CreateDocumentoUseCase)

    const result = await createDocumentoUseCase.execute({
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

export { CreateDocumentoController }
