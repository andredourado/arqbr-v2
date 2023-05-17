import { inject, injectable } from 'tsyringe'
import { TimeColeta } from '@modules/coleta/infra/typeorm/entities/time-coleta'
import { ITimeColetaRepository } from '@modules/coleta/repositories/i-time-coleta-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeleteTimeColetaUseCase {
  constructor(
    @inject('TimeColetaRepository')
    private timeColetaRepository: ITimeColetaRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const timeColeta = await this.timeColetaRepository.delete(id)

    return timeColeta
  }
}

export { DeleteTimeColetaUseCase }
