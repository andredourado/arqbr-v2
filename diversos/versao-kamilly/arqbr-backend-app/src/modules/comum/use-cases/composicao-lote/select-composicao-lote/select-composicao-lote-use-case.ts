import { inject, injectable } from 'tsyringe'
import { IComposicaoLoteRepository } from '@modules/comum/repositories/i-composicao-lote-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectComposicaoLoteUseCase {
  constructor(
    @inject('ComposicaoLoteRepository')
    private composicaoLoteRepository: IComposicaoLoteRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const composicaoLotes = await this.composicaoLoteRepository.select(filter)

    const newComposicaoLotes = {
      items: composicaoLotes.data,
      hasNext: false
    }

    return newComposicaoLotes
  }
}

export { SelectComposicaoLoteUseCase }
