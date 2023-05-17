import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListJornadaUseCase } from './list-jornada-use-case'

class ListJornadaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order
    } = request.query

    const listJornadaUseCase = container.resolve(ListJornadaUseCase)

    const jornadas = await listJornadaUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string
    })

    return response.json(jornadas)
  }
}

export { ListJornadaController }
