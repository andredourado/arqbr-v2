import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListVolumeUseCase } from './list-volume-use-case'

class ListVolumeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listVolumeUseCase = container.resolve(ListVolumeUseCase)

    const volumes = await listVolumeUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(volumes)
  }
}

export { ListVolumeController }
