import { inject, injectable } from 'tsyringe'
import { Planta } from '@modules/armazenamento/infra/typeorm/entities/planta'
import { IPlantaRepository } from '@modules/armazenamento/repositories/i-planta-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeletePlantaUseCase {
  constructor(
    @inject('PlantaRepository')
    private plantaRepository: IPlantaRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const planta = await this.plantaRepository.delete(id)

    return planta
  }
}

export { DeletePlantaUseCase }
