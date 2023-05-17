import { inject, injectable } from 'tsyringe'
import { ISolicitanteRepository } from '@modules/clientes/repositories/i-solicitante-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteSolicitanteUseCase {
  constructor(
    @inject('SolicitanteRepository')
    private solicitanteRepository: ISolicitanteRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const solicitante = await this.solicitanteRepository.multiDelete(ids)

    return solicitante
  }
}

export { MultiDeleteSolicitanteUseCase }
