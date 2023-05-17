import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListDepartamentoUseCase } from './list-departamento-use-case'

class ListDepartamentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listDepartamentoUseCase = container.resolve(ListDepartamentoUseCase)

    const departamentos = await listDepartamentoUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(departamentos)
  }
}

export { ListDepartamentoController }
