import { inject, injectable } from 'tsyringe'
import { Planta } from '@modules/armazenamento/infra/typeorm/entities/planta'
import { IPlantaRepository } from '@modules/armazenamento/repositories/i-planta-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountPlantaUseCase {
  constructor(
    @inject('PlantaRepository')
    private plantaRepository: IPlantaRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const plantasCount = await this.plantaRepository.count(
      search,
      filter
    )

    return plantasCount
  }
}

export { CountPlantaUseCase }
