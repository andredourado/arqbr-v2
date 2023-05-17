import { inject, injectable } from 'tsyringe'
import { Frequencia } from '@modules/comum/infra/typeorm/entities/frequencia'
import { IFrequenciaRepository } from '@modules/comum/repositories/i-frequencia-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  descricao: string
  espacoEmDias: number
  desabilitado: boolean
}

@injectable()
class CreateFrequenciaUseCase {
  constructor(
    @inject('FrequenciaRepository')
    private frequenciaRepository: IFrequenciaRepository
  ) {}

  async execute({
    descricao,
    espacoEmDias,
    desabilitado
  }: IRequest): Promise<Frequencia> {
    const result = await this.frequenciaRepository.create({
        descricao,
        espacoEmDias,
        desabilitado
      })
      .then(frequenciaResult => {
        return frequenciaResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateFrequenciaUseCase }
