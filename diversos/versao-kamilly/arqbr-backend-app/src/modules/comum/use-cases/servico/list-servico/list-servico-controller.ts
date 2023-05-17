import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListServicoUseCase } from './list-servico-use-case'

class ListServicoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order
    } = request.query

    const listServicoUseCase = container.resolve(ListServicoUseCase)

    const servicos = await listServicoUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string
    })

    return response.json(servicos)
  }
}

export { ListServicoController }
