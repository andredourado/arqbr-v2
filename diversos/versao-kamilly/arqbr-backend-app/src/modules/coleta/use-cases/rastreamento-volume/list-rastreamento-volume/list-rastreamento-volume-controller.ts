import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListRastreamentoVolumeUseCase } from './list-rastreamento-volume-use-case'

class ListRastreamentoVolumeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order
    } = request.query

    const listRastreamentoVolumeUseCase = container.resolve(ListRastreamentoVolumeUseCase)

    const rastreamentoVolumes = await listRastreamentoVolumeUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string
    })

    return response.json(rastreamentoVolumes)
  }
}

export { ListRastreamentoVolumeController }
