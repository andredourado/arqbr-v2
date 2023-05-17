import { inject, injectable } from "tsyringe"
import { IVeiculoRepository } from '@modules/coleta/repositories/i-veiculo-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectVeiculoUseCase {
  constructor(
    @inject('VeiculoRepository')
    private veiculoRepository: IVeiculoRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const veiculo = await this.veiculoRepository.idSelect(id)

    return veiculo
  }
}

export { IdSelectVeiculoUseCase }
