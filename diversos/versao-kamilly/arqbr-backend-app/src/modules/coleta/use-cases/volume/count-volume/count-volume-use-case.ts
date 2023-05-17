import { inject, injectable } from 'tsyringe'
import { Volume } from '@modules/coleta/infra/typeorm/entities/volume'
import { IVolumeRepository } from '@modules/coleta/repositories/i-volume-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
}

@injectable()
class CountVolumeUseCase {
  constructor(
    @inject('VolumeRepository')
    private volumeRepository: IVolumeRepository
  ) {}

  async execute({
    search
  }: IRequest): Promise<HttpResponse> {
    const volumesCount = await this.volumeRepository.count(
      search
    )

    return volumesCount
  }
}

export { CountVolumeUseCase }
