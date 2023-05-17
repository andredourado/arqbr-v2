import { inject, injectable } from 'tsyringe'
import { Volume } from '@modules/coleta/infra/typeorm/entities/volume'
import { IVolumeRepository } from '@modules/coleta/repositories/i-volume-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeleteVolumeUseCase {
  constructor(
    @inject('VolumeRepository')
    private volumeRepository: IVolumeRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const volume = await this.volumeRepository.delete(id)

    return volume
  }
}

export { DeleteVolumeUseCase }
