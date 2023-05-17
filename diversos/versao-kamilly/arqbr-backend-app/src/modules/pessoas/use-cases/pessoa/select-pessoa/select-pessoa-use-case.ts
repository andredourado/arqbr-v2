import { inject, injectable } from 'tsyringe'
import { IPessoaRepository } from '@modules/pessoas/repositories/i-pessoa-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectPessoaUseCase {
  constructor(
    @inject('PessoaRepository')
    private pessoaRepository: IPessoaRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const pessoas = await this.pessoaRepository.select(filter)

    const newPessoas = {
      items: pessoas.data,
      hasNext: false
    }

    return newPessoas
  }
}

export { SelectPessoaUseCase }
