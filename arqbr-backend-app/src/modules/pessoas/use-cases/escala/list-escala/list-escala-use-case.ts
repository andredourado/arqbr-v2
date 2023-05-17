import { inject, injectable } from 'tsyringe'
import { IEscalaRepository } from '@modules/pessoas/repositories/i-escala-repository'
import { IEscalaDTO } from '@modules/pessoas/dtos/i-escala-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: IEscalaDTO[],
  hasNext: boolean
}

@injectable()
class ListEscalaUseCase {
  constructor(
    @inject('EscalaRepository')
    private escalaRepository: IEscalaRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const escalas = await this.escalaRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countEscalas = await this.escalaRepository.count(
      search,
      filter
    )

    const numeroEscala = page * rowsPerPage

    const escalasResponse = {
      items: escalas.data,
      hasNext: numeroEscala < countEscalas.data.count
    }

    return escalasResponse
  }
}

export { ListEscalaUseCase }
