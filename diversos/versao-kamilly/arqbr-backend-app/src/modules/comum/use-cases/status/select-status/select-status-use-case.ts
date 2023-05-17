import { inject, injectable } from 'tsyringe'
import { IStatusRepository } from '@modules/comum/repositories/i-status-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectStatusUseCase {
  constructor(
    @inject('StatusRepository')
    private statusRepository: IStatusRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const statuses = await this.statusRepository.select(filter)

    const newStatuses = {
      items: statuses.data,
      hasNext: false
    }

    return newStatuses
  }
}

export { SelectStatusUseCase }
