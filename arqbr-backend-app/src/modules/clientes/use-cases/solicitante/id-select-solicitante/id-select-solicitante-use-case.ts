import { inject, injectable } from "tsyringe"
import { ISolicitanteRepository } from '@modules/clientes/repositories/i-solicitante-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectSolicitanteUseCase {
  constructor(
    @inject('SolicitanteRepository')
    private solicitanteRepository: ISolicitanteRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const solicitante = await this.solicitanteRepository.idSelect(id)

    return solicitante
  }
}

export { IdSelectSolicitanteUseCase }
