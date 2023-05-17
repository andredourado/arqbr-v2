import { inject, injectable } from 'tsyringe'
import { Pessoa } from '@modules/pessoas/infra/typeorm/entities/pessoa'
import { IPessoaRepository } from '@modules/pessoas/repositories/i-pessoa-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeletePessoaUseCase {
  constructor(
    @inject('PessoaRepository')
    private pessoaRepository: IPessoaRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const pessoa = await this.pessoaRepository.delete(id)

    return pessoa
  }
}

export { DeletePessoaUseCase }
