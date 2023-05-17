import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateDocumentoDigitalUseCase } from './update-documento-digital-use-case'

class UpdateDocumentoDigitalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      clienteId,
      departamentoId,
      tipoDocumentoId,
      nomeArquivo,
      nomeArquivoOrigem,
      conteudoEmTexto,
      numeroPaginas,
      solicitacaoFisico,
      dataSolicitacao,
      solicitanteId
    } = request.body

    const { id } = request.params

    const updateDocumentoDigitalUseCase = container.resolve(UpdateDocumentoDigitalUseCase)

    const result = await updateDocumentoDigitalUseCase.execute({
        id,
        clienteId,
        departamentoId,
        tipoDocumentoId,
        nomeArquivo,
        nomeArquivoOrigem,
        conteudoEmTexto,
        numeroPaginas,
        solicitacaoFisico,
        dataSolicitacao,
        solicitanteId
      })
      .then(documentoDigitalResult => {
        return documentoDigitalResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdateDocumentoDigitalController }
