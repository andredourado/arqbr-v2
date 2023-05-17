import { inject, injectable } from 'tsyringe'
import { IPlantaRepository } from '@modules/armazenamento/repositories/i-planta-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectPlantaUseCase {
  constructor(
    @inject('PlantaRepository')
    private plantaRepository: IPlantaRepository
  ) {}

  async execute({
    filter,
    unidadeId
  }): Promise<ResponseProps> {
    const plantas = await this.plantaRepository.select(filter, unidadeId)

    const newPlantas = {
      items: plantas.data,
      hasNext: false
    }

    return newPlantas
  }
}

export { SelectPlantaUseCase }
