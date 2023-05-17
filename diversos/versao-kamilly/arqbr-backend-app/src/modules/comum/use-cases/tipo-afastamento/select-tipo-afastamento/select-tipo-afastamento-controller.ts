import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectTipoAfastamentoUseCase } from './select-tipo-afastamento-use-case'

class SelectTipoAfastamentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectTipoAfastamentoUseCase = container.resolve(SelectTipoAfastamentoUseCase)

    const tiposAfastamento = await selectTipoAfastamentoUseCase.execute({
      filter: filter as string,
    })

    return response.json(tiposAfastamento)
  }
}

export { SelectTipoAfastamentoController }
