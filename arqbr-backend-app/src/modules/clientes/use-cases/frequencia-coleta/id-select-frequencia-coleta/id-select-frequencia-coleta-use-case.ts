import { inject, injectable } from "tsyringe"
import { IFrequenciaColetaRepository } from '@modules/clientes/repositories/i-frequencia-coleta-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectFrequenciaColetaUseCase {
  constructor(
    @inject('FrequenciaColetaRepository')
    private frequenciaColetaRepository: IFrequenciaColetaRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const frequenciaColeta = await this.frequenciaColetaRepository.idSelect(id)

    return frequenciaColeta
  }
}

export { IdSelectFrequenciaColetaUseCase }
