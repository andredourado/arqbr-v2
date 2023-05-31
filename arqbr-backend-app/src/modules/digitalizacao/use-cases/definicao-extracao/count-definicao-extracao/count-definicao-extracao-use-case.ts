import { inject, injectable } from 'tsyringe'
import { DefinicaoExtracao } from '@modules/digitalizacao/infra/typeorm/entities/definicao-extracao'
import { IDefinicaoExtracaoRepository } from '@modules/digitalizacao/repositories/i-definicao-extracao-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountDefinicaoExtracaoUseCase {
  constructor(
    @inject('DefinicaoExtracaoRepository')
    private definicaoExtracaoRepository: IDefinicaoExtracaoRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const definicaoExtracaoCount = await this.definicaoExtracaoRepository.count(
      search,
      filter
    )

    return definicaoExtracaoCount
  }
}

export { CountDefinicaoExtracaoUseCase }
