import { inject, injectable } from 'tsyringe'
import { RastreamentoVolume } from '@modules/coleta/infra/typeorm/entities/rastreamento-volume'
import { IRastreamentoVolumeRepository } from '@modules/coleta/repositories/i-rastreamento-volume-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  volumeId: string
  dataMovimentacao: Date
  horaMovimentacao: Date
  localDeArmazenagem: string
  statusId: string
}

@injectable()
class UpdateRastreamentoVolumeUseCase {
  constructor(
    @inject('RastreamentoVolumeRepository')
    private rastreamentoVolumeRepository: IRastreamentoVolumeRepository
  ) {}

  async execute({
    id,
    volumeId,
    dataMovimentacao,
    horaMovimentacao,
    localDeArmazenagem,
    statusId
  }: IRequest): Promise<HttpResponse> {
    const rastreamentoVolume = await this.rastreamentoVolumeRepository.update({
      id,
      volumeId,
      dataMovimentacao,
      horaMovimentacao,
      localDeArmazenagem,
      statusId
    })

    return rastreamentoVolume
  }
}

export { UpdateRastreamentoVolumeUseCase }
