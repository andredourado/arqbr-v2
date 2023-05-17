import { inject, injectable } from 'tsyringe'
import { Veiculo } from '@modules/coleta/infra/typeorm/entities/veiculo'
import { IVeiculoRepository } from '@modules/coleta/repositories/i-veiculo-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountVeiculoUseCase {
  constructor(
    @inject('VeiculoRepository')
    private veiculoRepository: IVeiculoRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const veiculosCount = await this.veiculoRepository.count(
      search,
      filter
    )

    return veiculosCount
  }
}

export { CountVeiculoUseCase }
