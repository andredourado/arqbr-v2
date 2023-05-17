import { inject, injectable } from "tsyringe"
import { IStatusRepository } from '@modules/comum/repositories/i-status-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectStatusUseCase {
  constructor(
    @inject('StatusRepository')
    private statusRepository: IStatusRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const status = await this.statusRepository.idSelect(id)

    return status
  }
}

export { IdSelectStatusUseCase }
