import { inject, injectable } from 'tsyringe'
import { IPosicaoRepository } from '@modules/armazenamento/repositories/i-posicao-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectPosicaoUseCase {
  constructor(
    @inject('PosicaoRepository')
    private posicaoRepository: IPosicaoRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const posicoes = await this.posicaoRepository.select(filter)

    const newPosicoes = {
      items: posicoes.data,
      hasNext: false
    }

    return newPosicoes
  }
}

export { SelectPosicaoUseCase }
