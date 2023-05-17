import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectEntregadorUseCase } from './select-entregador-use-case'

class SelectEntregadorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectEntregadorUseCase = container.resolve(SelectEntregadorUseCase)

    const entregadores = await selectEntregadorUseCase.execute({
      filter: filter as string,
    })

    return response.json(entregadores)
  }
}

export { SelectEntregadorController }
