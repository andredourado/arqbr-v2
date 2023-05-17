import { inject, injectable } from 'tsyringe'
import { ISugestaoRepository } from '@modules/clientes/repositories/i-sugestao-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectSugestaoUseCase {
  constructor(
    @inject('SugestaoRepository')
    private sugestaoRepository: ISugestaoRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const sugestoes = await this.sugestaoRepository.select(filter)

    const newSugestoes = {
      items: sugestoes.data,
      hasNext: false
    }

    return newSugestoes
  }
}

export { SelectSugestaoUseCase }
