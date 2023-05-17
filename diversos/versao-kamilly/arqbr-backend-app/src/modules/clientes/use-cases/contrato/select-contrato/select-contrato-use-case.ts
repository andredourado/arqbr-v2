import { inject, injectable } from 'tsyringe'
import { IContratoRepository } from '@modules/clientes/repositories/i-contrato-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectContratoUseCase {
  constructor(
    @inject('ContratoRepository')
    private contratoRepository: IContratoRepository
  ) {}

  async execute({
    filter,
    clienteId
  }): Promise<ResponseProps> {
    const contratos = await this.contratoRepository.select(filter, clienteId)

    const newContratos = {
      items: contratos.data,
      hasNext: false
    }

    return newContratos
  }
}

export { SelectContratoUseCase }
