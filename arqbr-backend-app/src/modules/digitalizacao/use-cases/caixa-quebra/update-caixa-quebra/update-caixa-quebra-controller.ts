import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateCaixaQuebraUseCase } from './update-caixa-quebra-use-case'

class UpdateCaixaQuebraController {
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

    const { id } = request.params

    const updateCaixaQuebraUseCase = container.resolve(UpdateCaixaQuebraUseCase)

    const result = await updateCaixaQuebraUseCase.execute({
        id,
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

export { UpdateCaixaQuebraController }
