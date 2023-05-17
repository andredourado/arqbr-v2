import { inject, injectable } from 'tsyringe'
import { FrequenciaColeta } from '@modules/clientes/infra/typeorm/entities/frequencia-coleta'
import { IFrequenciaColetaRepository } from '@modules/clientes/repositories/i-frequencia-coleta-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
}

@injectable()
class CountFrequenciaColetaUseCase {
  constructor(
    @inject('FrequenciaColetaRepository')
    private frequenciaColetaRepository: IFrequenciaColetaRepository
  ) {}

  async execute({
    search
  }: IRequest): Promise<HttpResponse> {
    const frequenciaColetasCount = await this.frequenciaColetaRepository.count(
      search
    )

    return frequenciaColetasCount
  }
}

export { CountFrequenciaColetaUseCase }
