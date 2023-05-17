import { inject, injectable } from 'tsyringe'
import { IClienteRepository } from '@modules/clientes/repositories/i-cliente-repository'
import { IClienteDTO } from '@modules/clientes/dtos/i-cliente-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string
}

interface ResponseProps {
  items: IClienteDTO[],
  hasNext: boolean
}

@injectable()
class ListClienteUseCase {
  constructor(
    @inject('ClienteRepository')
    private clienteRepository: IClienteRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = ''
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const clientes = await this.clienteRepository.list(
      search,
      newPage,
      rowsPerPage,
      order
    )

    const countClientes = await this.clienteRepository.count(
      search
    )

    const numeroCliente = page * rowsPerPage

    const clientesResponse = {
      items: clientes.data,
      hasNext: numeroCliente < countClientes.data.count
    }

    return clientesResponse
  }
}

export { ListClienteUseCase }
