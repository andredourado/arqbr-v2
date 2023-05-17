import { inject, injectable } from 'tsyringe'
import { RastreamentoVolume } from '@modules/coleta/infra/typeorm/entities/rastreamento-volume'
import { IRastreamentoVolumeRepository } from '@modules/coleta/repositories/i-rastreamento-volume-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountRastreamentoVolumeUseCase {
  constructor(
    @inject('RastreamentoVolumeRepository')
    private rastreamentoVolumeRepository: IRastreamentoVolumeRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const rastreamentoVolumesCount = await this.rastreamentoVolumeRepository.count(
      search,
      filter
    )

    return rastreamentoVolumesCount
  }
}

export { CountRastreamentoVolumeUseCase }
