import { inject, injectable } from 'tsyringe'
import { IFuncaoRepository } from '@modules/pessoas/repositories/i-funcao-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectFuncaoUseCase {
  constructor(
    @inject('FuncaoRepository')
    private funcaoRepository: IFuncaoRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const funcoes = await this.funcaoRepository.select(filter)

    const newFuncoes = {
      items: funcoes.data,
      hasNext: false
    }

    return newFuncoes
  }
}

export { SelectFuncaoUseCase }
