import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListSolicitanteUseCase } from './list-solicitante-use-case'

class ListSolicitanteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listSolicitanteUseCase = container.resolve(ListSolicitanteUseCase)

    const solicitantes = await listSolicitanteUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(solicitantes)
  }
}

export { ListSolicitanteController }
