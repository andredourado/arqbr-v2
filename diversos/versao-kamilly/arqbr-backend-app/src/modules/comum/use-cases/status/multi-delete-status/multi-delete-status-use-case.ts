import { inject, injectable } from 'tsyringe'
import { IStatusRepository } from '@modules/comum/repositories/i-status-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteStatusUseCase {
  constructor(
    @inject('StatusRepository')
    private statusRepository: IStatusRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const status = await this.statusRepository.multiDelete(ids)

    return status
  }
}

export { MultiDeleteStatusUseCase }
