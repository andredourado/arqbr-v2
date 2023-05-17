import { inject, injectable } from 'tsyringe'
import { IUnidadeSlaRepository } from '@modules/comum/repositories/i-unidade-sla-repository'
import { IUnidadeSlaDTO } from '@modules/comum/dtos/i-unidade-sla-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string
}

interface ResponseProps {
  items: IUnidadeSlaDTO[],
  hasNext: boolean
}

@injectable()
class ListUnidadeSlaUseCase {
  constructor(
    @inject('UnidadeSlaRepository')
    private unidadeSlaRepository: IUnidadeSlaRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = ''
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const unidadesSla = await this.unidadeSlaRepository.list(
      search,
      newPage,
      rowsPerPage,
      order
    )

    const countUnidadesSla = await this.unidadeSlaRepository.count(
      search
    )

    const numeroUnidadeSla = page * rowsPerPage

    const unidadesSlaResponse = {
      items: unidadesSla.data,
      hasNext: numeroUnidadeSla < countUnidadesSla.data.count
    }

    return unidadesSlaResponse
  }
}

export { ListUnidadeSlaUseCase }
