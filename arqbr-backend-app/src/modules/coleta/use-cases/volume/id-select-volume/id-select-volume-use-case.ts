import { inject, injectable } from "tsyringe"
import { IVolumeRepository } from '@modules/coleta/repositories/i-volume-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectVolumeUseCase {
  constructor(
    @inject('VolumeRepository')
    private volumeRepository: IVolumeRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const volume = await this.volumeRepository.idSelect(id)

    return volume
  }
}

export { IdSelectVolumeUseCase }
