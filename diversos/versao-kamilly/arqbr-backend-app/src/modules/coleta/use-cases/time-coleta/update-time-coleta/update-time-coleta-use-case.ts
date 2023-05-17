import { inject, injectable } from 'tsyringe'
import { TimeColeta } from '@modules/coleta/infra/typeorm/entities/time-coleta'
import { ITimeColetaRepository } from '@modules/coleta/repositories/i-time-coleta-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  coletaId: string
  pessoaId: string
}

@injectable()
class UpdateTimeColetaUseCase {
  constructor(
    @inject('TimeColetaRepository')
    private timeColetaRepository: ITimeColetaRepository
  ) {}

  async execute({
    id,
    coletaId,
    pessoaId
  }: IRequest): Promise<HttpResponse> {
    const timeColeta = await this.timeColetaRepository.update({
      id,
      coletaId,
      pessoaId
    })

    return timeColeta
  }
}

export { UpdateTimeColetaUseCase }
