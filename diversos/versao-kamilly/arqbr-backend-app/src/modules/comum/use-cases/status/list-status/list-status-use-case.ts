import { inject, injectable } from 'tsyringe'
import { IStatusRepository } from '@modules/comum/repositories/i-status-repository'
import { IStatusDTO } from '@modules/comum/dtos/i-status-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string
}

interface ResponseProps {
  items: IStatusDTO[],
  hasNext: boolean
}

@injectable()
class ListStatusUseCase {
  constructor(
    @inject('StatusRepository')
    private statusRepository: IStatusRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = ''
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const statuses = await this.statusRepository.list(
      search,
      newPage,
      rowsPerPage,
      order
    )

    const countStatuses = await this.statusRepository.count(
      search
    )

    const numeroStatus = page * rowsPerPage

    const statusesResponse = {
      items: statuses.data,
      hasNext: numeroStatus < countStatuses.data.count
    }

    return statusesResponse
  }
}

export { ListStatusUseCase }
