import { inject, injectable } from 'tsyringe'
import { Status } from '@modules/comum/infra/typeorm/entities/status'
import { IStatusRepository } from '@modules/comum/repositories/i-status-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetStatusUseCase {
  constructor(
    @inject('StatusRepository')
    private statusRepository: IStatusRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const status = await this.statusRepository.get(id)

    return status
  }
}

export { GetStatusUseCase }
