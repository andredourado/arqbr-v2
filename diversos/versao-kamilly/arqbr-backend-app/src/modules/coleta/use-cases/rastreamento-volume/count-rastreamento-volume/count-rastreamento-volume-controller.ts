import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountRastreamentoVolumeUseCase } from './count-rastreamento-volume-use-case'

class CountRastreamentoVolumeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countRastreamentoVolumeUseCase = container.resolve(CountRastreamentoVolumeUseCase)

    const rastreamentoVolumesCount = await countRastreamentoVolumeUseCase.execute({
      search: search as string
    })

    return response.status(rastreamentoVolumesCount.statusCode).json(rastreamentoVolumesCount)
  }
}

export { CountRastreamentoVolumeController }
