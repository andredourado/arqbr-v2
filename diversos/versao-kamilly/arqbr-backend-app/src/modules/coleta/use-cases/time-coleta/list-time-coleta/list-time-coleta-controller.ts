import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListTimeColetaUseCase } from './list-time-coleta-use-case'

class ListTimeColetaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order
    } = request.query

    const listTimeColetaUseCase = container.resolve(ListTimeColetaUseCase)

    const timesColeta = await listTimeColetaUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string
    })

    return response.json(timesColeta)
  }
}

export { ListTimeColetaController }
