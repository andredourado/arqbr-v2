import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListUnidadeUseCase } from './list-unidade-use-case'

class ListUnidadeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listUnidadeUseCase = container.resolve(ListUnidadeUseCase)

    const unidades = await listUnidadeUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(unidades)
  }
}

export { ListUnidadeController }
