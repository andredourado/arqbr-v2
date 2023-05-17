import { inject, injectable } from 'tsyringe'
import { RastreamentoVolume } from '@modules/coleta/infra/typeorm/entities/rastreamento-volume'
import { IRastreamentoVolumeRepository } from '@modules/coleta/repositories/i-rastreamento-volume-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeleteRastreamentoVolumeUseCase {
  constructor(
    @inject('RastreamentoVolumeRepository')
    private rastreamentoVolumeRepository: IRastreamentoVolumeRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const rastreamentoVolume = await this.rastreamentoVolumeRepository.delete(id)

    return rastreamentoVolume
  }
}

export { DeleteRastreamentoVolumeUseCase }
