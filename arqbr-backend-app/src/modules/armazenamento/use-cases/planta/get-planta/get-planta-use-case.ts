import { inject, injectable } from 'tsyringe'
import { Planta } from '@modules/armazenamento/infra/typeorm/entities/planta'
import { IPlantaRepository } from '@modules/armazenamento/repositories/i-planta-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetPlantaUseCase {
  constructor(
    @inject('PlantaRepository')
    private plantaRepository: IPlantaRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const planta = await this.plantaRepository.get(id)

    return planta
  }
}

export { GetPlantaUseCase }
