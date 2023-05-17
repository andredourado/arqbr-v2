import { inject, injectable } from 'tsyringe'
import { ITipoAfastamentoRepository } from '@modules/comum/repositories/i-tipo-afastamento-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectTipoAfastamentoUseCase {
  constructor(
    @inject('TipoAfastamentoRepository')
    private tipoAfastamentoRepository: ITipoAfastamentoRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const tiposAfastamento = await this.tipoAfastamentoRepository.select(filter)

    const newTiposAfastamento = {
      items: tiposAfastamento.data,
      hasNext: false
    }

    return newTiposAfastamento
  }
}

export { SelectTipoAfastamentoUseCase }
