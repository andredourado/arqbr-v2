import { inject, injectable } from 'tsyringe'
import { Veiculo } from '@modules/coleta/infra/typeorm/entities/veiculo'
import { IVeiculoRepository } from '@modules/coleta/repositories/i-veiculo-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetVeiculoUseCase {
  constructor(
    @inject('VeiculoRepository')
    private veiculoRepository: IVeiculoRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const veiculo = await this.veiculoRepository.get(id)

    return veiculo
  }
}

export { GetVeiculoUseCase }
