import { inject, injectable } from 'tsyringe'
import { IPessoaRepository } from '@modules/pessoas/repositories/i-pessoa-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeletePessoaUseCase {
  constructor(
    @inject('PessoaRepository')
    private pessoaRepository: IPessoaRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const pessoa = await this.pessoaRepository.multiDelete(ids)

    return pessoa
  }
}

export { MultiDeletePessoaUseCase }
