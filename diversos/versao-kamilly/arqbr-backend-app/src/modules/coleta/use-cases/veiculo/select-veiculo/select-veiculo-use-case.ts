import { inject, injectable } from 'tsyringe'
import { IVeiculoRepository } from '@modules/coleta/repositories/i-veiculo-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectVeiculoUseCase {
  constructor(
    @inject('VeiculoRepository')
    private veiculoRepository: IVeiculoRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const veiculos = await this.veiculoRepository.select(filter)

    const newVeiculos = {
      items: veiculos.data,
      hasNext: false
    }

    return newVeiculos
  }
}

export { SelectVeiculoUseCase }
