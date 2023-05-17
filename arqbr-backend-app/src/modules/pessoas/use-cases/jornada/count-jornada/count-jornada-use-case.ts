import { inject, injectable } from 'tsyringe'
import { Jornada } from '@modules/pessoas/infra/typeorm/entities/jornada'
import { IJornadaRepository } from '@modules/pessoas/repositories/i-jornada-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountJornadaUseCase {
  constructor(
    @inject('JornadaRepository')
    private jornadaRepository: IJornadaRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const jornadasCount = await this.jornadaRepository.count(
      search,
      filter
    )

    return jornadasCount
  }
}

export { CountJornadaUseCase }
