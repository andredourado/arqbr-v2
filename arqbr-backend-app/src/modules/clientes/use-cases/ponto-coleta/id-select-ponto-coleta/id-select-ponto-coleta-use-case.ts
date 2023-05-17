import { inject, injectable } from "tsyringe"
import { IPontoColetaRepository } from '@modules/clientes/repositories/i-ponto-coleta-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectPontoColetaUseCase {
  constructor(
    @inject('PontoColetaRepository')
    private pontoColetaRepository: IPontoColetaRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const pontoColeta = await this.pontoColetaRepository.idSelect(id)

    return pontoColeta
  }
}

export { IdSelectPontoColetaUseCase }
