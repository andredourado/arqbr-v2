import { inject, injectable } from "tsyringe"
import { IPlantaRepository } from '@modules/armazenamento/repositories/i-planta-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectPlantaUseCase {
  constructor(
    @inject('PlantaRepository')
    private plantaRepository: IPlantaRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const planta = await this.plantaRepository.idSelect(id)

    return planta
  }
}

export { IdSelectPlantaUseCase }
