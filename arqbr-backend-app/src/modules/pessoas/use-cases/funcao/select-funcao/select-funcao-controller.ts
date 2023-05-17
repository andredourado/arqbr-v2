import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectFuncaoUseCase } from './select-funcao-use-case'

class SelectFuncaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectFuncaoUseCase = container.resolve(SelectFuncaoUseCase)

    const funcoes = await selectFuncaoUseCase.execute({
      filter: filter as string,
    })

    return response.json(funcoes)
  }
}

export { SelectFuncaoController }
