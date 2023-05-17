import { inject, injectable } from 'tsyringe'
import { ITimeColetaRepository } from '@modules/coleta/repositories/i-time-coleta-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteTimeColetaUseCase {
  constructor(
    @inject('TimeColetaRepository')
    private timeColetaRepository: ITimeColetaRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const timeColeta = await this.timeColetaRepository.multiDelete(ids)

    return timeColeta
  }
}

export { MultiDeleteTimeColetaUseCase }
