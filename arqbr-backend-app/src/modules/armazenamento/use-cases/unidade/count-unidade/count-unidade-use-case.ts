import { inject, injectable } from 'tsyringe'
import { Unidade } from '@modules/armazenamento/infra/typeorm/entities/unidade'
import { IUnidadeRepository } from '@modules/armazenamento/repositories/i-unidade-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountUnidadeUseCase {
  constructor(
    @inject('UnidadeRepository')
    private unidadeRepository: IUnidadeRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const unidadesCount = await this.unidadeRepository.count(
      search,
      filter
    )

    return unidadesCount
  }
}

export { CountUnidadeUseCase }
