import { inject, injectable } from 'tsyringe'
import { PontoColeta } from '@modules/clientes/infra/typeorm/entities/ponto-coleta'
import { IPontoColetaRepository } from '@modules/clientes/repositories/i-ponto-coleta-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountPontoColetaUseCase {
  constructor(
    @inject('PontoColetaRepository')
    private pontoColetaRepository: IPontoColetaRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const pontosColetaCount = await this.pontoColetaRepository.count(
      search,
      filter
    )

    return pontosColetaCount
  }
}

export { CountPontoColetaUseCase }
