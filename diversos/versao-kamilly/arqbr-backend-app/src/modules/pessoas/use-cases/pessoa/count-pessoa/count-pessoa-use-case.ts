import { inject, injectable } from 'tsyringe'
import { Pessoa } from '@modules/pessoas/infra/typeorm/entities/pessoa'
import { IPessoaRepository } from '@modules/pessoas/repositories/i-pessoa-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
}

@injectable()
class CountPessoaUseCase {
  constructor(
    @inject('PessoaRepository')
    private pessoaRepository: IPessoaRepository
  ) {}

  async execute({
    search
  }: IRequest): Promise<HttpResponse> {
    const pessoasCount = await this.pessoaRepository.count(
      search
    )

    return pessoasCount
  }
}

export { CountPessoaUseCase }
