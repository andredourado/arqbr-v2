import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListTipoAfastamentoUseCase } from './list-tipo-afastamento-use-case'

class ListTipoAfastamentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order
    } = request.query

    const listTipoAfastamentoUseCase = container.resolve(ListTipoAfastamentoUseCase)

    const tiposAfastamento = await listTipoAfastamentoUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string
    })

    return response.json(tiposAfastamento)
  }
}

export { ListTipoAfastamentoController }
