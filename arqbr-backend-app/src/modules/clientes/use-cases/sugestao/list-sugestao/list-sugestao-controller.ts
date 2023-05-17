import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListSugestaoUseCase } from './list-sugestao-use-case'

class ListSugestaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listSugestaoUseCase = container.resolve(ListSugestaoUseCase)

    const sugestoes = await listSugestaoUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(sugestoes)
  }
}

export { ListSugestaoController }
