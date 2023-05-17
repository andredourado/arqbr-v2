import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectUnidadeSlaUseCase } from './select-unidade-sla-use-case'

class SelectUnidadeSlaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectUnidadeSlaUseCase = container.resolve(SelectUnidadeSlaUseCase)

    const unidadesSla = await selectUnidadeSlaUseCase.execute({
      filter: filter as string,
    })

    return response.json(unidadesSla)
  }
}

export { SelectUnidadeSlaController }
