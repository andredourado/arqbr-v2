import { inject, injectable } from 'tsyringe'
import { IColetaRepository } from '@modules/coleta/repositories/i-coleta-repository'
import { IColetaDTO } from '@modules/coleta/dtos/i-coleta-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: IColetaDTO[],
  hasNext: boolean
}

@injectable()
class ListColetaUseCase {
  constructor(
    @inject('ColetaRepository')
    private coletaRepository: IColetaRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const coletas = await this.coletaRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countColetas = await this.coletaRepository.count(
      search,
      filter
    )

    const numeroColeta = page * rowsPerPage

    const coletasResponse = {
      items: coletas.data,
      hasNext: numeroColeta < countColetas.data.count
    }

    return coletasResponse
  }
}

export { ListColetaUseCase }
