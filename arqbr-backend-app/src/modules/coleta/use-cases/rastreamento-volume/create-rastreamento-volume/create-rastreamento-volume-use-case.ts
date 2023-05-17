import { inject, injectable } from 'tsyringe'
import { RastreamentoVolume } from '@modules/coleta/infra/typeorm/entities/rastreamento-volume'
import { IRastreamentoVolumeRepository } from '@modules/coleta/repositories/i-rastreamento-volume-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  volumeId: string
  dataMovimentacao: Date
  horaMovimentacao: Date
  localDeArmazenagem: string
}

@injectable()
class CreateRastreamentoVolumeUseCase {
  constructor(
    @inject('RastreamentoVolumeRepository')
    private rastreamentoVolumeRepository: IRastreamentoVolumeRepository
  ) {}

  async execute({
    volumeId,
    dataMovimentacao,
    horaMovimentacao,
    localDeArmazenagem
  }: IRequest): Promise<RastreamentoVolume> {
    const result = await this.rastreamentoVolumeRepository.create({
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

    return result
  }
}

export { CreateRastreamentoVolumeUseCase }
