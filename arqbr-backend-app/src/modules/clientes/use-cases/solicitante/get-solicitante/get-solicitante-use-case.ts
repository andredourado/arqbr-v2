import { inject, injectable } from 'tsyringe'
import { Solicitante } from '@modules/clientes/infra/typeorm/entities/solicitante'
import { ISolicitanteRepository } from '@modules/clientes/repositories/i-solicitante-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetSolicitanteUseCase {
  constructor(
    @inject('SolicitanteRepository')
    private solicitanteRepository: ISolicitanteRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const solicitante = await this.solicitanteRepository.get(id)

    return solicitante
  }
}

export { GetSolicitanteUseCase }
