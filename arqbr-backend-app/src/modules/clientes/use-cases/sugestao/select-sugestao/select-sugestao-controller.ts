import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectSugestaoUseCase } from './select-sugestao-use-case'

class SelectSugestaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectSugestaoUseCase = container.resolve(SelectSugestaoUseCase)

    const sugestoes = await selectSugestaoUseCase.execute({
      filter: filter as string,
    })

    return response.json(sugestoes)
  }
}

export { SelectSugestaoController }
