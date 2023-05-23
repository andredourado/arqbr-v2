import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateCaixaQuebraUseCase } from './create-caixa-quebra-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateCaixaQuebraController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      clienteId,
      departamentoId,
      tipoDocumentoId,
      nomeArquivoOrigem,
      sequencia,
      paginaInicial,
      paginaFinal,
      status
    } = request.body

    const createCaixaQuebraUseCase = container.resolve(CreateCaixaQuebraUseCase)

    const result = await createCaixaQuebraUseCase.execute({
        clienteId,
        departamentoId,
        tipoDocumentoId,
        nomeArquivoOrigem,
        sequencia,
        paginaInicial,
        paginaFinal,
        status
      })
      .then(caixaQuebraResult => {
        return caixaQuebraResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateCaixaQuebraController }
