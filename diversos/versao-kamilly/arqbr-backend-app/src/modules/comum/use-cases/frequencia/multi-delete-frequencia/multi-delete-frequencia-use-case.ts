import { inject, injectable } from 'tsyringe'
import { IFrequenciaRepository } from '@modules/comum/repositories/i-frequencia-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteFrequenciaUseCase {
  constructor(
    @inject('FrequenciaRepository')
    private frequenciaRepository: IFrequenciaRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const frequencia = await this.frequenciaRepository.multiDelete(ids)

    return frequencia
  }
}

export { MultiDeleteFrequenciaUseCase }
