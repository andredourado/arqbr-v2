import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteEntregadorUseCase } from './multi-delete-entregador-use-case'
import { ListEntregadorUseCase } from '../list-entregador/list-entregador-use-case'

class MultiDeleteEntregadorController {
  async handle(request: Request, response: Response ): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteEntregadorUseCase = container.resolve(MultiDeleteEntregadorUseCase)
    await multiDeleteEntregadorUseCase.execute(ids)


    // restore list with updated records

    const listEntregadorUseCase = container.resolve(ListEntregadorUseCase)
    const entregadores = await listEntregadorUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(entregadores)
  }
}

export { MultiDeleteEntregadorController }
