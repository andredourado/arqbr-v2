import { inject, injectable } from 'tsyringe'
import { IRastreamentoVolumeRepository } from '@modules/coleta/repositories/i-rastreamento-volume-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectRastreamentoVolumeUseCase {
  constructor(
    @inject('RastreamentoVolumeRepository')
    private rastreamentoVolumeRepository: IRastreamentoVolumeRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const rastreamentoVolumes = await this.rastreamentoVolumeRepository.select(filter)

    const newRastreamentoVolumes = {
      items: rastreamentoVolumes.data,
      hasNext: false
    }

    return newRastreamentoVolumes
  }
}

export { SelectRastreamentoVolumeUseCase }
