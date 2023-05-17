import { inject, injectable } from "tsyringe"
import { IPessoaRepository } from '@modules/pessoas/repositories/i-pessoa-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectPessoaUseCase {
  constructor(
    @inject('PessoaRepository')
    private pessoaRepository: IPessoaRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const pessoa = await this.pessoaRepository.idSelect(id)

    return pessoa
  }
}

export { IdSelectPessoaUseCase }
