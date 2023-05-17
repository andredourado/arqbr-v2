import { inject, injectable } from 'tsyringe'
import { Veiculo } from '@modules/coleta/infra/typeorm/entities/veiculo'
import { IVeiculoRepository } from '@modules/coleta/repositories/i-veiculo-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeleteVeiculoUseCase {
  constructor(
    @inject('VeiculoRepository')
    private veiculoRepository: IVeiculoRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const veiculo = await this.veiculoRepository.delete(id)

    return veiculo
  }
}

export { DeleteVeiculoUseCase }
