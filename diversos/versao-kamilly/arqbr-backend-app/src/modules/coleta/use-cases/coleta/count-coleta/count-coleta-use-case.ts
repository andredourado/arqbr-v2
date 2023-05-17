import { inject, injectable } from 'tsyringe'
import { Coleta } from '@modules/coleta/infra/typeorm/entities/coleta'
import { IColetaRepository } from '@modules/coleta/repositories/i-coleta-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
}

@injectable()
class CountColetaUseCase {
  constructor(
    @inject('ColetaRepository')
    private coletaRepository: IColetaRepository
  ) {}

  async execute({
    search
  }: IRequest): Promise<HttpResponse> {
    const coletasCount = await this.coletaRepository.count(
      search
    )

    return coletasCount
  }
}

export { CountColetaUseCase }
