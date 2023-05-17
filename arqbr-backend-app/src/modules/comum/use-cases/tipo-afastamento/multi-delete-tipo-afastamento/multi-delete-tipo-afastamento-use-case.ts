import { inject, injectable } from 'tsyringe'
import { ITipoAfastamentoRepository } from '@modules/comum/repositories/i-tipo-afastamento-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteTipoAfastamentoUseCase {
  constructor(
    @inject('TipoAfastamentoRepository')
    private tipoAfastamentoRepository: ITipoAfastamentoRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const tipoAfastamento = await this.tipoAfastamentoRepository.multiDelete(ids)

    return tipoAfastamento
  }
}

export { MultiDeleteTipoAfastamentoUseCase }
