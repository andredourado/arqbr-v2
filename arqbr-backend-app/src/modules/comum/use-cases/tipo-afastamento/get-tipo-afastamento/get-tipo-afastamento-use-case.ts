import { inject, injectable } from 'tsyringe'
import { TipoAfastamento } from '@modules/comum/infra/typeorm/entities/tipo-afastamento'
import { ITipoAfastamentoRepository } from '@modules/comum/repositories/i-tipo-afastamento-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetTipoAfastamentoUseCase {
  constructor(
    @inject('TipoAfastamentoRepository')
    private tipoAfastamentoRepository: ITipoAfastamentoRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const tipoAfastamento = await this.tipoAfastamentoRepository.get(id)

    return tipoAfastamento
  }
}

export { GetTipoAfastamentoUseCase }
