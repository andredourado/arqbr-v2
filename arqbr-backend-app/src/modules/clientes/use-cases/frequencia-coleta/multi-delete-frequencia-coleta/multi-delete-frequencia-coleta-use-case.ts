import { inject, injectable } from 'tsyringe'
import { IFrequenciaColetaRepository } from '@modules/clientes/repositories/i-frequencia-coleta-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteFrequenciaColetaUseCase {
  constructor(
    @inject('FrequenciaColetaRepository')
    private frequenciaColetaRepository: IFrequenciaColetaRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const frequenciaColeta = await this.frequenciaColetaRepository.multiDelete(ids)

    return frequenciaColeta
  }
}

export { MultiDeleteFrequenciaColetaUseCase }
