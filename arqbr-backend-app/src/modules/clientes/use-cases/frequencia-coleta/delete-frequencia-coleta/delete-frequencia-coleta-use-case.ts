import { inject, injectable } from 'tsyringe'
import { FrequenciaColeta } from '@modules/clientes/infra/typeorm/entities/frequencia-coleta'
import { IFrequenciaColetaRepository } from '@modules/clientes/repositories/i-frequencia-coleta-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeleteFrequenciaColetaUseCase {
  constructor(
    @inject('FrequenciaColetaRepository')
    private frequenciaColetaRepository: IFrequenciaColetaRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const frequenciaColeta = await this.frequenciaColetaRepository.delete(id)

    return frequenciaColeta
  }
}

export { DeleteFrequenciaColetaUseCase }
