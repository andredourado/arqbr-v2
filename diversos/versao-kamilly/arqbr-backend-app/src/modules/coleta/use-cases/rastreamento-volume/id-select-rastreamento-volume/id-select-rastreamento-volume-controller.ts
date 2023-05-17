import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectRastreamentoVolumeUseCase } from './id-select-rastreamento-volume-use-case'

class IdSelectRastreamentoVolumeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectRastreamentoVolumeUseCase = container.resolve(IdSelectRastreamentoVolumeUseCase)

    const rastreamentoVolume = await idSelectRastreamentoVolumeUseCase.execute({
      id: id as string
    })

    return response.json(rastreamentoVolume.data)
  }
}

export { IdSelectRastreamentoVolumeController }
