import { inject, injectable } from 'tsyringe'
import { Sugestao } from '@modules/clientes/infra/typeorm/entities/sugestao'
import { ISugestaoRepository } from '@modules/clientes/repositories/i-sugestao-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountSugestaoUseCase {
  constructor(
    @inject('SugestaoRepository')
    private sugestaoRepository: ISugestaoRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const sugestoesCount = await this.sugestaoRepository.count(
      search,
      filter
    )

    return sugestoesCount
  }
}

export { CountSugestaoUseCase }
