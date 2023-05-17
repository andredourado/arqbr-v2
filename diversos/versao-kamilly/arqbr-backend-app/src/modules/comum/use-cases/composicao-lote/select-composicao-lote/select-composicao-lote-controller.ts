import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectComposicaoLoteUseCase } from './select-composicao-lote-use-case'

class SelectComposicaoLoteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectComposicaoLoteUseCase = container.resolve(SelectComposicaoLoteUseCase)

    const composicaoLotes = await selectComposicaoLoteUseCase.execute({
      filter: filter as string,
    })

    return response.json(composicaoLotes)
  }
}

export { SelectComposicaoLoteController }
