import { inject, injectable } from 'tsyringe'
import { Entregador } from '@modules/coleta/infra/typeorm/entities/entregador'
import { IEntregadorRepository } from '@modules/coleta/repositories/i-entregador-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
}

@injectable()
class CountEntregadorUseCase {
  constructor(
    @inject('EntregadorRepository')
    private entregadorRepository: IEntregadorRepository
  ) {}

  async execute({
    search
  }: IRequest): Promise<HttpResponse> {
    const entregadoresCount = await this.entregadorRepository.count(
      search
    )

    return entregadoresCount
  }
}

export { CountEntregadorUseCase }
