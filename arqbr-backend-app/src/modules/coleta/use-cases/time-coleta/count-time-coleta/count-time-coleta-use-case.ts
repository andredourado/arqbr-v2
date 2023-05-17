import { inject, injectable } from 'tsyringe'
import { TimeColeta } from '@modules/coleta/infra/typeorm/entities/time-coleta'
import { ITimeColetaRepository } from '@modules/coleta/repositories/i-time-coleta-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountTimeColetaUseCase {
  constructor(
    @inject('TimeColetaRepository')
    private timeColetaRepository: ITimeColetaRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const timesColetaCount = await this.timeColetaRepository.count(
      search,
      filter
    )

    return timesColetaCount
  }
}

export { CountTimeColetaUseCase }
