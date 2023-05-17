import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectUnidadeUseCase } from './select-unidade-use-case'

class SelectUnidadeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectUnidadeUseCase = container.resolve(SelectUnidadeUseCase)

    const unidades = await selectUnidadeUseCase.execute({
      filter: filter as string,
    })

    return response.json(unidades)
  }
}

export { SelectUnidadeController }
