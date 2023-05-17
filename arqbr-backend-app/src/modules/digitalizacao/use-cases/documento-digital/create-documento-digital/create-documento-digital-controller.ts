import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateDocumentoDigitalUseCase } from './create-documento-digital-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateDocumentoDigitalController {
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

    const createDocumentoDigitalUseCase = container.resolve(CreateDocumentoDigitalUseCase)

    const result = await createDocumentoDigitalUseCase.execute({
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

export { CreateDocumentoDigitalController }
