import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListAfastamentoUseCase } from './list-afastamento-use-case'

class ListAfastamentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listAfastamentoUseCase = container.resolve(ListAfastamentoUseCase)

    const afastamentos = await listAfastamentoUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(afastamentos)
  }
}

export { ListAfastamentoController }
