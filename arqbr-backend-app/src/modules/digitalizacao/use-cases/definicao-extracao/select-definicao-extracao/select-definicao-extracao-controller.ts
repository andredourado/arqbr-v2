import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectDefinicaoExtracaoUseCase } from './select-definicao-extracao-use-case'

class SelectDefinicaoExtracaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectDefinicaoExtracaoUseCase = container.resolve(SelectDefinicaoExtracaoUseCase)

    const definicoesExtracao = await selectDefinicaoExtracaoUseCase.execute({
      filter: filter as string,
    })

    return response.json(definicoesExtracao)
  }
}

export { SelectDefinicaoExtracaoController }
