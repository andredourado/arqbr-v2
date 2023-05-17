import { inject, injectable } from 'tsyringe'
import { Coleta } from '@modules/coleta/infra/typeorm/entities/coleta'
import { IColetaRepository } from '@modules/coleta/repositories/i-coleta-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountColetaUseCase {
  constructor(
    @inject('ColetaRepository')
    private coletaRepository: IColetaRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const coletasCount = await this.coletaRepository.count(
      search,
      filter
    )

    return coletasCount
  }
}

export { CountColetaUseCase }
