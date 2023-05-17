import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListPlantaUseCase } from './list-planta-use-case'

class ListPlantaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listPlantaUseCase = container.resolve(ListPlantaUseCase)

    const plantas = await listPlantaUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(plantas)
  }
}

export { ListPlantaController }
