import { inject, injectable } from 'tsyringe'
import { Entregador } from '@modules/coleta/infra/typeorm/entities/entregador'
import { IEntregadorRepository } from '@modules/coleta/repositories/i-entregador-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetEntregadorUseCase {
  constructor(
    @inject('EntregadorRepository')
    private entregadorRepository: IEntregadorRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const entregador = await this.entregadorRepository.get(id)

    return entregador
  }
}

export { GetEntregadorUseCase }
