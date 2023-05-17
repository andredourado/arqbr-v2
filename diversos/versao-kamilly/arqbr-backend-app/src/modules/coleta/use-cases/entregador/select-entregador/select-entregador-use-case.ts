import { inject, injectable } from 'tsyringe'
import { IEntregadorRepository } from '@modules/coleta/repositories/i-entregador-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectEntregadorUseCase {
  constructor(
    @inject('EntregadorRepository')
    private entregadorRepository: IEntregadorRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const entregadores = await this.entregadorRepository.select(filter)

    const newEntregadores = {
      items: entregadores.data,
      hasNext: false
    }

    return newEntregadores
  }
}

export { SelectEntregadorUseCase }
