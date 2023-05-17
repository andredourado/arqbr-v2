import { inject, injectable } from "tsyringe"
import { IEntregadorRepository } from '@modules/coleta/repositories/i-entregador-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectEntregadorUseCase {
  constructor(
    @inject('EntregadorRepository')
    private entregadorRepository: IEntregadorRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const entregador = await this.entregadorRepository.idSelect(id)

    return entregador
  }
}

export { IdSelectEntregadorUseCase }
