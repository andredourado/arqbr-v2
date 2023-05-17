import { inject, injectable } from "tsyringe"
import { ITipoAfastamentoRepository } from '@modules/comum/repositories/i-tipo-afastamento-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectTipoAfastamentoUseCase {
  constructor(
    @inject('TipoAfastamentoRepository')
    private tipoAfastamentoRepository: ITipoAfastamentoRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const tipoAfastamento = await this.tipoAfastamentoRepository.idSelect(id)

    return tipoAfastamento
  }
}

export { IdSelectTipoAfastamentoUseCase }
