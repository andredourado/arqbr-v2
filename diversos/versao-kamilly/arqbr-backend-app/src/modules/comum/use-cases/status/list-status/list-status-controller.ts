import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListStatusUseCase } from './list-status-use-case'

class ListStatusController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order
    } = request.query

    const listStatusUseCase = container.resolve(ListStatusUseCase)

    const statuses = await listStatusUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string
    })

    return response.json(statuses)
  }
}

export { ListStatusController }
