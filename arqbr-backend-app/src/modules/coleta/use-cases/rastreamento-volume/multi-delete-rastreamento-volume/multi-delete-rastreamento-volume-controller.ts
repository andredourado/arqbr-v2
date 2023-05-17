import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteRastreamentoVolumeUseCase } from './multi-delete-rastreamento-volume-use-case'
import { ListRastreamentoVolumeUseCase } from '../list-rastreamento-volume/list-rastreamento-volume-use-case'

class MultiDeleteRastreamentoVolumeController {
  async handle(request: Request, response: Response ): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteRastreamentoVolumeUseCase = container.resolve(MultiDeleteRastreamentoVolumeUseCase)
    await multiDeleteRastreamentoVolumeUseCase.execute(ids)


    // restore list with updated records

    const listRastreamentoVolumeUseCase = container.resolve(ListRastreamentoVolumeUseCase)
    const rastreamentoVolumes = await listRastreamentoVolumeUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(rastreamentoVolumes)
  }
}

export { MultiDeleteRastreamentoVolumeController }
