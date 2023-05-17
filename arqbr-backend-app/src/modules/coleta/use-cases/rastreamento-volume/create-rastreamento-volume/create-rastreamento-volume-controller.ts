import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateRastreamentoVolumeUseCase } from './create-rastreamento-volume-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateRastreamentoVolumeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      volumeId,
      dataMovimentacao,
      horaMovimentacao,
      localDeArmazenagem
    } = request.body

    const createRastreamentoVolumeUseCase = container.resolve(CreateRastreamentoVolumeUseCase)

    const result = await createRastreamentoVolumeUseCase.execute({
        volumeId,
        dataMovimentacao,
        horaMovimentacao,
        localDeArmazenagem
      })
      .then(rastreamentoVolumeResult => {
        return rastreamentoVolumeResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateRastreamentoVolumeController }
