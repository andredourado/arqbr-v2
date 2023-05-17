import { inject, injectable } from 'tsyringe'
import { IServicoContratadoRepository } from '@modules/clientes/repositories/i-servico-contratado-repository'
import { IServicoContratadoDTO } from '@modules/clientes/dtos/i-servico-contratado-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: IServicoContratadoDTO[],
  hasNext: boolean
}

@injectable()
class ListServicoContratadoUseCase {
  constructor(
    @inject('ServicoContratadoRepository')
    private servicoContratadoRepository: IServicoContratadoRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const servicosContratados = await this.servicoContratadoRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countServicosContratados = await this.servicoContratadoRepository.count(
      search,
      filter
    )

    const numeroServicoContratado = page * rowsPerPage

    const servicosContratadosResponse = {
      items: servicosContratados.data,
      hasNext: numeroServicoContratado < countServicosContratados.data.count
    }

    return servicosContratadosResponse
  }
}

export { ListServicoContratadoUseCase }
