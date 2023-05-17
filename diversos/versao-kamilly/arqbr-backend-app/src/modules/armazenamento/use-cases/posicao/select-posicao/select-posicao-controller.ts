import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectPosicaoUseCase } from './select-posicao-use-case'

class SelectPosicaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectPosicaoUseCase = container.resolve(SelectPosicaoUseCase)

    const posicoes = await selectPosicaoUseCase.execute({
      filter: filter as string,
    })

    return response.json(posicoes)
  }
}

export { SelectPosicaoController }
