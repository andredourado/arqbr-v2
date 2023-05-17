import { inject, injectable } from 'tsyringe'
import { TipoAfastamento } from '@modules/comum/infra/typeorm/entities/tipo-afastamento'
import { ITipoAfastamentoRepository } from '@modules/comum/repositories/i-tipo-afastamento-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountTipoAfastamentoUseCase {
  constructor(
    @inject('TipoAfastamentoRepository')
    private tipoAfastamentoRepository: ITipoAfastamentoRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const tiposAfastamentoCount = await this.tipoAfastamentoRepository.count(
      search,
      filter
    )

    return tiposAfastamentoCount
  }
}

export { CountTipoAfastamentoUseCase }
