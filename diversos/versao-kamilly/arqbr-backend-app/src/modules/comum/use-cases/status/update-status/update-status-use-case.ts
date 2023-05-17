import { inject, injectable } from 'tsyringe'
import { Status } from '@modules/comum/infra/typeorm/entities/status'
import { IStatusRepository } from '@modules/comum/repositories/i-status-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  servicoId: string
  sequencia: string
  descricao: string
  desabilitado: boolean
}

@injectable()
class UpdateStatusUseCase {
  constructor(
    @inject('StatusRepository')
    private statusRepository: IStatusRepository
  ) {}

  async execute({
    id,
    servicoId,
    sequencia,
    descricao,
    desabilitado
  }: IRequest): Promise<HttpResponse> {
    const status = await this.statusRepository.update({
      id,
      servicoId,
      sequencia,
      descricao,
      desabilitado
    })

    return status
  }
}

export { UpdateStatusUseCase }
