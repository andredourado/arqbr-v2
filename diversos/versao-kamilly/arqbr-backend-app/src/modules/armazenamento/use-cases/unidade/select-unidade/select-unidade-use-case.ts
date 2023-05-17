import { inject, injectable } from 'tsyringe'
import { IUnidadeRepository } from '@modules/armazenamento/repositories/i-unidade-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectUnidadeUseCase {
  constructor(
    @inject('UnidadeRepository')
    private unidadeRepository: IUnidadeRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const unidades = await this.unidadeRepository.select(filter)

    const newUnidades = {
      items: unidades.data,
      hasNext: false
    }

    return newUnidades
  }
}

export { SelectUnidadeUseCase }
