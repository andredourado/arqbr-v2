import { inject, injectable } from 'tsyringe'
import { IVeiculoRepository } from '@modules/coleta/repositories/i-veiculo-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteVeiculoUseCase {
  constructor(
    @inject('VeiculoRepository')
    private veiculoRepository: IVeiculoRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const veiculo = await this.veiculoRepository.multiDelete(ids)

    return veiculo
  }
}

export { MultiDeleteVeiculoUseCase }
