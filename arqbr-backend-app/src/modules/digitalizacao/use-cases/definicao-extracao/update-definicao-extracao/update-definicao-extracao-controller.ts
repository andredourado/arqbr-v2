import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateDefinicaoExtracaoUseCase } from './update-definicao-extracao-use-case'

class UpdateDefinicaoExtracaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      clienteId,
      departamentoId,
      tipoDocumentoId,
      pdf,
      textoQuebra,
      nomeCampo,
      titulo,
      estrategia,
      texto,
      linha,
      inicio,
      comprimento
    } = request.body

    const { id } = request.params

    const updateDefinicaoExtracaoUseCase = container.resolve(UpdateDefinicaoExtracaoUseCase)

    const result = await updateDefinicaoExtracaoUseCase.execute({
        id,
        clienteId,
        departamentoId,
        tipoDocumentoId,
        pdf,
        textoQuebra,
        nomeCampo,
        titulo,
        estrategia,
        texto,
        linha,
        inicio,
        comprimento
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

export { UpdateDefinicaoExtracaoController }
