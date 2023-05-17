import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListColetaUseCase } from './list-coleta-use-case'

class ListColetaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order
    } = request.query

    const listColetaUseCase = container.resolve(ListColetaUseCase)

    const coletas = await listColetaUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string
    })

    return response.json(coletas)
  }
}

export { ListColetaController }
