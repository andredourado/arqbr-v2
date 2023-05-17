import { inject, injectable } from 'tsyringe'
import { IAfastamentoRepository } from '@modules/pessoas/repositories/i-afastamento-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectAfastamentoUseCase {
  constructor(
    @inject('AfastamentoRepository')
    private afastamentoRepository: IAfastamentoRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const afastamentos = await this.afastamentoRepository.select(filter)

    const newAfastamentos = {
      items: afastamentos.data,
      hasNext: false
    }

    return newAfastamentos
  }
}

export { SelectAfastamentoUseCase }
