import { inject, injectable } from 'tsyringe'
import { IVolumeRepository } from '@modules/coleta/repositories/i-volume-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteVolumeUseCase {
  constructor(
    @inject('VolumeRepository')
    private volumeRepository: IVolumeRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const volume = await this.volumeRepository.multiDelete(ids)

    return volume
  }
}

export { MultiDeleteVolumeUseCase }
