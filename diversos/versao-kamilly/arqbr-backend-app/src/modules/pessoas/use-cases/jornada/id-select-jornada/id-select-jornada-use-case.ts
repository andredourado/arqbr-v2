import { inject, injectable } from "tsyringe"
import { IJornadaRepository } from '@modules/pessoas/repositories/i-jornada-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectJornadaUseCase {
  constructor(
    @inject('JornadaRepository')
    private jornadaRepository: IJornadaRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const jornada = await this.jornadaRepository.idSelect(id)

    return jornada
  }
}

export { IdSelectJornadaUseCase }
