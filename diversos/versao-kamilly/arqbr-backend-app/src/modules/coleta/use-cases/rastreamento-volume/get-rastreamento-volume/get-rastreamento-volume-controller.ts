import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetRastreamentoVolumeUseCase } from './get-rastreamento-volume-use-case'

class GetRastreamentoVolumeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getRastreamentoVolumeUseCase = container.resolve(GetRastreamentoVolumeUseCase)
    const rastreamentoVolume = await getRastreamentoVolumeUseCase.execute(id)

    return response.status(rastreamentoVolume.statusCode).json(rastreamentoVolume.data)
  }
}

export { GetRastreamentoVolumeController }
