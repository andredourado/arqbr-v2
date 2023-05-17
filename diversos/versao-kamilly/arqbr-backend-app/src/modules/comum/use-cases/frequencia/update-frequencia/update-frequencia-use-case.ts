import { inject, injectable } from 'tsyringe'
import { Frequencia } from '@modules/comum/infra/typeorm/entities/frequencia'
import { IFrequenciaRepository } from '@modules/comum/repositories/i-frequencia-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  descricao: string
  espacoEmDias: number
  desabilitado: boolean
}

@injectable()
class UpdateFrequenciaUseCase {
  constructor(
    @inject('FrequenciaRepository')
    private frequenciaRepository: IFrequenciaRepository
  ) {}

  async execute({
    id,
    descricao,
    espacoEmDias,
    desabilitado
  }: IRequest): Promise<HttpResponse> {
    const frequencia = await this.frequenciaRepository.update({
      id,
      descricao,
      espacoEmDias,
      desabilitado
    })

    return frequencia
  }
}

export { UpdateFrequenciaUseCase }
