import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListEscalaUseCase } from './list-escala-use-case'

class ListEscalaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listEscalaUseCase = container.resolve(ListEscalaUseCase)

    const escalas = await listEscalaUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(escalas)
  }
}

export { ListEscalaController }
