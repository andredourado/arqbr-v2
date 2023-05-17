import { inject, injectable } from 'tsyringe'
import { Entregador } from '@modules/coleta/infra/typeorm/entities/entregador'
import { IEntregadorRepository } from '@modules/coleta/repositories/i-entregador-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeleteEntregadorUseCase {
  constructor(
    @inject('EntregadorRepository')
    private entregadorRepository: IEntregadorRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const entregador = await this.entregadorRepository.delete(id)

    return entregador
  }
}

export { DeleteEntregadorUseCase }
