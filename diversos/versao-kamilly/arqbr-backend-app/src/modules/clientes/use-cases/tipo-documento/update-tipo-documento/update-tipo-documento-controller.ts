import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateTipoDocumentoUseCase } from './update-tipo-documento-use-case'

class UpdateTipoDocumentoController {
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

    const { id } = request.params

    const updateTipoDocumentoUseCase = container.resolve(UpdateTipoDocumentoUseCase)

    const result = await updateTipoDocumentoUseCase.execute({
        id,
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

export { UpdateTipoDocumentoController }
