import { inject, injectable } from 'tsyringe'
import { IDefinicaoExtracaoRepository } from '@modules/digitalizacao/repositories/i-definicao-extracao-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectDefinicaoExtracaoUseCase {
  constructor(
    @inject('DefinicaoExtracaoRepository')
    private definicaoExtracaoRepository: IDefinicaoExtracaoRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const definicoesExtracao = await this.definicaoExtracaoRepository.select(filter)

    const newDefinicoesExtracao = {
      items: definicoesExtracao.data,
      hasNext: false
    }

    return newDefinicoesExtracao
  }
}

export { SelectDefinicaoExtracaoUseCase }
