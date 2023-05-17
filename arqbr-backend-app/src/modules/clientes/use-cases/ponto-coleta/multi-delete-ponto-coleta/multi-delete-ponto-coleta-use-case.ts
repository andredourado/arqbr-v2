import { inject, injectable } from 'tsyringe'
import { IPontoColetaRepository } from '@modules/clientes/repositories/i-ponto-coleta-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeletePontoColetaUseCase {
  constructor(
    @inject('PontoColetaRepository')
    private pontoColetaRepository: IPontoColetaRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const pontoColeta = await this.pontoColetaRepository.multiDelete(ids)

    return pontoColeta
  }
}

export { MultiDeletePontoColetaUseCase }
