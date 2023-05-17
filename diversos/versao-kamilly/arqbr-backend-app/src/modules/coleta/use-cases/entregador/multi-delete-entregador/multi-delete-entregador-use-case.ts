import { inject, injectable } from 'tsyringe'
import { IEntregadorRepository } from '@modules/coleta/repositories/i-entregador-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteEntregadorUseCase {
  constructor(
    @inject('EntregadorRepository')
    private entregadorRepository: IEntregadorRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const entregador = await this.entregadorRepository.multiDelete(ids)

    return entregador
  }
}

export { MultiDeleteEntregadorUseCase }
