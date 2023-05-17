import { inject, injectable } from "tsyringe"
import { IRastreamentoVolumeRepository } from '@modules/coleta/repositories/i-rastreamento-volume-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectRastreamentoVolumeUseCase {
  constructor(
    @inject('RastreamentoVolumeRepository')
    private rastreamentoVolumeRepository: IRastreamentoVolumeRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const rastreamentoVolume = await this.rastreamentoVolumeRepository.idSelect(id)

    return rastreamentoVolume
  }
}

export { IdSelectRastreamentoVolumeUseCase }
