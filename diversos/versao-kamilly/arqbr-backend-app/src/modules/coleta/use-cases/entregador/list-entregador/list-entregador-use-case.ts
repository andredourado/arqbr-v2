import { inject, injectable } from 'tsyringe'
import { IEntregadorRepository } from '@modules/coleta/repositories/i-entregador-repository'
import { IEntregadorDTO } from '@modules/coleta/dtos/i-entregador-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string
}

interface ResponseProps {
  items: IEntregadorDTO[],
  hasNext: boolean
}

@injectable()
class ListEntregadorUseCase {
  constructor(
    @inject('EntregadorRepository')
    private entregadorRepository: IEntregadorRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = ''
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const entregadores = await this.entregadorRepository.list(
      search,
      newPage,
      rowsPerPage,
      order
    )

    const countEntregadores = await this.entregadorRepository.count(
      search
    )

    const numeroEntregador = page * rowsPerPage

    const entregadoresResponse = {
      items: entregadores.data,
      hasNext: numeroEntregador < countEntregadores.data.count
    }

    return entregadoresResponse
  }
}

export { ListEntregadorUseCase }
