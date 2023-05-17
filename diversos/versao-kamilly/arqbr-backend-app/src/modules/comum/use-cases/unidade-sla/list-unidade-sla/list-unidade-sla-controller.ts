import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListUnidadeSlaUseCase } from './list-unidade-sla-use-case'

class ListUnidadeSlaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order
    } = request.query

    const listUnidadeSlaUseCase = container.resolve(ListUnidadeSlaUseCase)

    const unidadesSla = await listUnidadeSlaUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string
    })

    return response.json(unidadesSla)
  }
}

export { ListUnidadeSlaController }
