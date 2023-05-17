import { inject, injectable } from 'tsyringe'
import { TipoAfastamento } from '@modules/comum/infra/typeorm/entities/tipo-afastamento'
import { ITipoAfastamentoRepository } from '@modules/comum/repositories/i-tipo-afastamento-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
}

@injectable()
class CountTipoAfastamentoUseCase {
  constructor(
    @inject('TipoAfastamentoRepository')
    private tipoAfastamentoRepository: ITipoAfastamentoRepository
  ) {}

  async execute({
    search
  }: IRequest): Promise<HttpResponse> {
    const tiposAfastamentoCount = await this.tipoAfastamentoRepository.count(
      search
    )

    return tiposAfastamentoCount
  }
}

export { CountTipoAfastamentoUseCase }
