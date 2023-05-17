import { inject, injectable } from 'tsyringe'
import { IJornadaRepository } from '@modules/pessoas/repositories/i-jornada-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteJornadaUseCase {
  constructor(
    @inject('JornadaRepository')
    private jornadaRepository: IJornadaRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const jornada = await this.jornadaRepository.multiDelete(ids)

    return jornada
  }
}

export { MultiDeleteJornadaUseCase }
