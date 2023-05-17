import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateRastreamentoVolumeUseCase } from './update-rastreamento-volume-use-case'

class UpdateRastreamentoVolumeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      volumeId,
      dataMovimentacao,
      horaMovimentacao,
      localDeArmazenagem,
      statusId
    } = request.body

    const { id } = request.params

    const updateRastreamentoVolumeUseCase = container.resolve(UpdateRastreamentoVolumeUseCase)

    const result = await updateRastreamentoVolumeUseCase.execute({
        id,
        volumeId,
        dataMovimentacao,
        horaMovimentacao,
        localDeArmazenagem,
        statusId
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

export { UpdateRastreamentoVolumeController }
