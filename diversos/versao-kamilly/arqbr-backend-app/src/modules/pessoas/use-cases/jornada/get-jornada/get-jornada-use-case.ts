import { inject, injectable } from 'tsyringe'
import { Jornada } from '@modules/pessoas/infra/typeorm/entities/jornada'
import { IJornadaRepository } from '@modules/pessoas/repositories/i-jornada-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetJornadaUseCase {
  constructor(
    @inject('JornadaRepository')
    private jornadaRepository: IJornadaRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const jornada = await this.jornadaRepository.get(id)

    return jornada
  }
}

export { GetJornadaUseCase }
