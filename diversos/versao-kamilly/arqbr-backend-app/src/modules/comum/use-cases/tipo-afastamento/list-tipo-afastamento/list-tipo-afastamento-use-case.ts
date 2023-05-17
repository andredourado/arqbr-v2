import { inject, injectable } from 'tsyringe'
import { ITipoAfastamentoRepository } from '@modules/comum/repositories/i-tipo-afastamento-repository'
import { ITipoAfastamentoDTO } from '@modules/comum/dtos/i-tipo-afastamento-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string
}

interface ResponseProps {
  items: ITipoAfastamentoDTO[],
  hasNext: boolean
}

@injectable()
class ListTipoAfastamentoUseCase {
  constructor(
    @inject('TipoAfastamentoRepository')
    private tipoAfastamentoRepository: ITipoAfastamentoRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = ''
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const tiposAfastamento = await this.tipoAfastamentoRepository.list(
      search,
      newPage,
      rowsPerPage,
      order
    )

    const countTiposAfastamento = await this.tipoAfastamentoRepository.count(
      search
    )

    const numeroTipoAfastamento = page * rowsPerPage

    const tiposAfastamentoResponse = {
      items: tiposAfastamento.data,
      hasNext: numeroTipoAfastamento < countTiposAfastamento.data.count
    }

    return tiposAfastamentoResponse
  }
}

export { ListTipoAfastamentoUseCase }
