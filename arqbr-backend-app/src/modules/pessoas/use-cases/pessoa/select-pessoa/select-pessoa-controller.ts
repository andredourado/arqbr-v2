import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectPessoaUseCase } from './select-pessoa-use-case'

class SelectPessoaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectPessoaUseCase = container.resolve(SelectPessoaUseCase)

    const pessoas = await selectPessoaUseCase.execute({
      filter: filter as string,
    })

    return response.json(pessoas)
  }
}

export { SelectPessoaController }
