import { inject, injectable } from 'tsyringe'
import { IVolumeRepository } from '@modules/coleta/repositories/i-volume-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectVolumeUseCase {
  constructor(
    @inject('VolumeRepository')
    private volumeRepository: IVolumeRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const volumes = await this.volumeRepository.select(filter)

    const newVolumes = {
      items: volumes.data,
      hasNext: false
    }

    return newVolumes
  }
}

export { SelectVolumeUseCase }
