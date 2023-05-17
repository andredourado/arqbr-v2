import { inject, injectable } from 'tsyringe'
import { Status } from '@modules/comum/infra/typeorm/entities/status'
import { IStatusRepository } from '@modules/comum/repositories/i-status-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
}

@injectable()
class CountStatusUseCase {
  constructor(
    @inject('StatusRepository')
    private statusRepository: IStatusRepository
  ) {}

  async execute({
    search
  }: IRequest): Promise<HttpResponse> {
    const statusesCount = await this.statusRepository.count(
      search
    )

    return statusesCount
  }
}

export { CountStatusUseCase }
