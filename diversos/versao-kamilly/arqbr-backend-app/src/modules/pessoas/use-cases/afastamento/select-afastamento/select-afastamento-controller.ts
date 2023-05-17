import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectAfastamentoUseCase } from './select-afastamento-use-case'

class SelectAfastamentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectAfastamentoUseCase = container.resolve(SelectAfastamentoUseCase)

    const afastamentos = await selectAfastamentoUseCase.execute({
      filter: filter as string,
    })

    return response.json(afastamentos)
  }
}

export { SelectAfastamentoController }
