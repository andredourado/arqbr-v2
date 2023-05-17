import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectRastreamentoVolumeUseCase } from './select-rastreamento-volume-use-case'

class SelectRastreamentoVolumeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectRastreamentoVolumeUseCase = container.resolve(SelectRastreamentoVolumeUseCase)

    const rastreamentoVolumes = await selectRastreamentoVolumeUseCase.execute({
      filter: filter as string,
    })

    return response.json(rastreamentoVolumes)
  }
}

export { SelectRastreamentoVolumeController }
