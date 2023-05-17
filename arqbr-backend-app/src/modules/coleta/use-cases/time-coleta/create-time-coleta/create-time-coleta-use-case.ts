import { inject, injectable } from 'tsyringe'
import { TimeColeta } from '@modules/coleta/infra/typeorm/entities/time-coleta'
import { ITimeColetaRepository } from '@modules/coleta/repositories/i-time-coleta-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  coletaId: string
  pessoaId: string
}

@injectable()
class CreateTimeColetaUseCase {
  constructor(
    @inject('TimeColetaRepository')
    private timeColetaRepository: ITimeColetaRepository
  ) {}

  async execute({
    coletaId,
    pessoaId
  }: IRequest): Promise<TimeColeta> {
    const result = await this.timeColetaRepository.create({
        coletaId,
        pessoaId
      })
      .then(timeColetaResult => {
        return timeColetaResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateTimeColetaUseCase }
