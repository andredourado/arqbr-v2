import { inject, injectable } from 'tsyringe'
import { IAfastamentoRepository } from '@modules/pessoas/repositories/i-afastamento-repository'
import { IAfastamentoDTO } from '@modules/pessoas/dtos/i-afastamento-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string
}

interface ResponseProps {
  items: IAfastamentoDTO[],
  hasNext: boolean
}

@injectable()
class ListAfastamentoUseCase {
  constructor(
    @inject('AfastamentoRepository')
    private afastamentoRepository: IAfastamentoRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = ''
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const afastamentos = await this.afastamentoRepository.list(
      search,
      newPage,
      rowsPerPage,
      order
    )

    const countAfastamentos = await this.afastamentoRepository.count(
      search
    )

    const numeroAfastamento = page * rowsPerPage

    const afastamentosResponse = {
      items: afastamentos.data,
      hasNext: numeroAfastamento < countAfastamentos.data.count
    }

    return afastamentosResponse
  }
}

export { ListAfastamentoUseCase }
