import { inject, injectable } from 'tsyringe'
import { Frequencia } from '@modules/comum/infra/typeorm/entities/frequencia'
import { IFrequenciaRepository } from '@modules/comum/repositories/i-frequencia-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
}

@injectable()
class CountFrequenciaUseCase {
  constructor(
    @inject('FrequenciaRepository')
    private frequenciaRepository: IFrequenciaRepository
  ) {}

  async execute({
    search
  }: IRequest): Promise<HttpResponse> {
    const frequenciasCount = await this.frequenciaRepository.count(
      search
    )

    return frequenciasCount
  }
}

export { CountFrequenciaUseCase }
