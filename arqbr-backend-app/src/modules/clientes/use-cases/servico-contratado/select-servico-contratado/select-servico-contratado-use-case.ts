import { inject, injectable } from 'tsyringe'
import { IServicoContratadoRepository } from '@modules/clientes/repositories/i-servico-contratado-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectServicoContratadoUseCase {
  constructor(
    @inject('ServicoContratadoRepository')
    private servicoContratadoRepository: IServicoContratadoRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const servicosContratados = await this.servicoContratadoRepository.select(filter)

    const newServicosContratados = {
      items: servicosContratados.data,
      hasNext: false
    }

    return newServicosContratados
  }
}

export { SelectServicoContratadoUseCase }
