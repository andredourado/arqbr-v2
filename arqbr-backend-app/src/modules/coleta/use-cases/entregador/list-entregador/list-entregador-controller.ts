import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListEntregadorUseCase } from './list-entregador-use-case'

class ListEntregadorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listEntregadorUseCase = container.resolve(ListEntregadorUseCase)

    const entregadores = await listEntregadorUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(entregadores)
  }
}

export { ListEntregadorController }
