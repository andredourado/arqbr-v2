import { inject, injectable } from 'tsyringe'
import { PontoColeta } from '@modules/clientes/infra/typeorm/entities/ponto-coleta'
import { IPontoColetaRepository } from '@modules/clientes/repositories/i-ponto-coleta-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetPontoColetaUseCase {
  constructor(
    @inject('PontoColetaRepository')
    private pontoColetaRepository: IPontoColetaRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const pontoColeta = await this.pontoColetaRepository.get(id)

    return pontoColeta
  }
}

export { GetPontoColetaUseCase }
