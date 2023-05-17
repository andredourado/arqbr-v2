import { inject, injectable } from 'tsyringe'
import { Frequencia } from '@modules/comum/infra/typeorm/entities/frequencia'
import { IFrequenciaRepository } from '@modules/comum/repositories/i-frequencia-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeleteFrequenciaUseCase {
  constructor(
    @inject('FrequenciaRepository')
    private frequenciaRepository: IFrequenciaRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const frequencia = await this.frequenciaRepository.delete(id)

    return frequencia
  }
}

export { DeleteFrequenciaUseCase }
