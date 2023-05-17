import { inject, injectable } from 'tsyringe'
import { IUnidadeRepository } from '@modules/armazenamento/repositories/i-unidade-repository'
import { IUnidadeDTO } from '@modules/armazenamento/dtos/i-unidade-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: IUnidadeDTO[],
  hasNext: boolean
}

@injectable()
class ListUnidadeUseCase {
  constructor(
    @inject('UnidadeRepository')
    private unidadeRepository: IUnidadeRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const unidades = await this.unidadeRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countUnidades = await this.unidadeRepository.count(
      search,
      filter
    )

    const numeroUnidade = page * rowsPerPage

    const unidadesResponse = {
      items: unidades.data,
      hasNext: numeroUnidade < countUnidades.data.count
    }

    return unidadesResponse
  }
}

export { ListUnidadeUseCase }
