import { inject, injectable } from 'tsyringe'
import { ICaixaQuebraRepository } from '@modules/digitalizacao/repositories/i-caixa-quebra-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectCaixaQuebraUseCase {
  constructor(
    @inject('CaixaQuebraRepository')
    private caixaQuebraRepository: ICaixaQuebraRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const caixasQuebras = await this.caixaQuebraRepository.select(filter)

    const newCaixasQuebras = {
      items: caixasQuebras.data,
      hasNext: false
    }

    return newCaixasQuebras
  }
}

export { SelectCaixaQuebraUseCase }
