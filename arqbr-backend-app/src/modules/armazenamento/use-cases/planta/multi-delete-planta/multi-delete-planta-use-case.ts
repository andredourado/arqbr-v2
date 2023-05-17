import { inject, injectable } from 'tsyringe'
import { IPlantaRepository } from '@modules/armazenamento/repositories/i-planta-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeletePlantaUseCase {
  constructor(
    @inject('PlantaRepository')
    private plantaRepository: IPlantaRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const planta = await this.plantaRepository.multiDelete(ids)

    return planta
  }
}

export { MultiDeletePlantaUseCase }
