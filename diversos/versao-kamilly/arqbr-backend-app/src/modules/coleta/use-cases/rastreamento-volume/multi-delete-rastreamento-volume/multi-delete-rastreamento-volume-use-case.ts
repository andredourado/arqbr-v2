import { inject, injectable } from 'tsyringe'
import { IRastreamentoVolumeRepository } from '@modules/coleta/repositories/i-rastreamento-volume-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteRastreamentoVolumeUseCase {
  constructor(
    @inject('RastreamentoVolumeRepository')
    private rastreamentoVolumeRepository: IRastreamentoVolumeRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const rastreamentoVolume = await this.rastreamentoVolumeRepository.multiDelete(ids)

    return rastreamentoVolume
  }
}

export { MultiDeleteRastreamentoVolumeUseCase }
