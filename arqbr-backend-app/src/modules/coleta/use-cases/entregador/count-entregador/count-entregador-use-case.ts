import { inject, injectable } from 'tsyringe'
import { Entregador } from '@modules/coleta/infra/typeorm/entities/entregador'
import { IEntregadorRepository } from '@modules/coleta/repositories/i-entregador-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountEntregadorUseCase {
  constructor(
    @inject('EntregadorRepository')
    private entregadorRepository: IEntregadorRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const entregadoresCount = await this.entregadorRepository.count(
      search,
      filter
    )

    return entregadoresCount
  }
}

export { CountEntregadorUseCase }
