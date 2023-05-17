import { inject, injectable } from "tsyringe"
import { ITimeColetaRepository } from '@modules/coleta/repositories/i-time-coleta-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectTimeColetaUseCase {
  constructor(
    @inject('TimeColetaRepository')
    private timeColetaRepository: ITimeColetaRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const timeColeta = await this.timeColetaRepository.idSelect(id)

    return timeColeta
  }
}

export { IdSelectTimeColetaUseCase }
