import { inject, injectable } from "tsyringe"
import { IFrequenciaRepository } from '@modules/comum/repositories/i-frequencia-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectFrequenciaUseCase {
  constructor(
    @inject('FrequenciaRepository')
    private frequenciaRepository: IFrequenciaRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const frequencia = await this.frequenciaRepository.idSelect(id)

    return frequencia
  }
}

export { IdSelectFrequenciaUseCase }
