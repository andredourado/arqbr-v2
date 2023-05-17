import { inject, injectable } from 'tsyringe'
import { Status } from '@modules/comum/infra/typeorm/entities/status'
import { IStatusRepository } from '@modules/comum/repositories/i-status-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  servicoId: string
  sequencia: string
  descricao: string
  desabilitado: boolean
}

@injectable()
class CreateStatusUseCase {
  constructor(
    @inject('StatusRepository')
    private statusRepository: IStatusRepository
  ) {}

  async execute({
    servicoId,
    sequencia,
    descricao,
    desabilitado
  }: IRequest): Promise<Status> {
    const result = await this.statusRepository.create({
        servicoId,
        sequencia,
        descricao,
        desabilitado
      })
      .then(statusResult => {
        return statusResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateStatusUseCase }
