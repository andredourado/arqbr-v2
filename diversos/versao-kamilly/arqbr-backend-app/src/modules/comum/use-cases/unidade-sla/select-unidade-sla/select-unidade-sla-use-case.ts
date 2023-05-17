import { inject, injectable } from 'tsyringe'
import { IUnidadeSlaRepository } from '@modules/comum/repositories/i-unidade-sla-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectUnidadeSlaUseCase {
  constructor(
    @inject('UnidadeSlaRepository')
    private unidadeSlaRepository: IUnidadeSlaRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const unidadesSla = await this.unidadeSlaRepository.select(filter)

    const newUnidadesSla = {
      items: unidadesSla.data,
      hasNext: false
    }

    return newUnidadesSla
  }
}

export { SelectUnidadeSlaUseCase }
