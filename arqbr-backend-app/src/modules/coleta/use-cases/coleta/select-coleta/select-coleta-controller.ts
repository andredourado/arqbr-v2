import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectColetaUseCase } from './select-coleta-use-case'

class SelectColetaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectColetaUseCase = container.resolve(SelectColetaUseCase)

    const coletas = await selectColetaUseCase.execute({
      filter: filter as string,
    })

    return response.json(coletas)
  }
}

export { SelectColetaController }
