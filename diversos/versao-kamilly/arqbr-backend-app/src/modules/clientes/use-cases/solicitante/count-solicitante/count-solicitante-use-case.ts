import { inject, injectable } from 'tsyringe'
import { Solicitante } from '@modules/clientes/infra/typeorm/entities/solicitante'
import { ISolicitanteRepository } from '@modules/clientes/repositories/i-solicitante-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
}

@injectable()
class CountSolicitanteUseCase {
  constructor(
    @inject('SolicitanteRepository')
    private solicitanteRepository: ISolicitanteRepository
  ) {}

  async execute({
    search
  }: IRequest): Promise<HttpResponse> {
    const solicitantesCount = await this.solicitanteRepository.count(
      search
    )

    return solicitantesCount
  }
}

export { CountSolicitanteUseCase }
