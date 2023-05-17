import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateTipoDocumentoUseCase } from './create-tipo-documento-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateTipoDocumentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      clienteId,
      contratoId,
      departamentoId,
      descricao,
      composicaoLoteId,
      numeroPaginas,
      mascaraNomeArquivo,
      prazoDescarteAnos,
      desabilitado
    } = request.body

    const createTipoDocumentoUseCase = container.resolve(CreateTipoDocumentoUseCase)

    const result = await createTipoDocumentoUseCase.execute({
        clienteId,
        contratoId,
        departamentoId,
        descricao,
        composicaoLoteId,
        numeroPaginas,
        mascaraNomeArquivo,
        prazoDescarteAnos,
        desabilitado
      })
      .then(tipoDocumentoResult => {
        return tipoDocumentoResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateTipoDocumentoController }
