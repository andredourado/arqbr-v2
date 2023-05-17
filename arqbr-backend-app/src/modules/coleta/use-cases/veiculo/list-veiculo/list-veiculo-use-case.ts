import { inject, injectable } from 'tsyringe'
import { IVeiculoRepository } from '@modules/coleta/repositories/i-veiculo-repository'
import { IVeiculoDTO } from '@modules/coleta/dtos/i-veiculo-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: IVeiculoDTO[],
  hasNext: boolean
}

@injectable()
class ListVeiculoUseCase {
  constructor(
    @inject('VeiculoRepository')
    private veiculoRepository: IVeiculoRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const veiculos = await this.veiculoRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countVeiculos = await this.veiculoRepository.count(
      search,
      filter
    )

    const numeroVeiculo = page * rowsPerPage

    const veiculosResponse = {
      items: veiculos.data,
      hasNext: numeroVeiculo < countVeiculos.data.count
    }

    return veiculosResponse
  }
}

export { ListVeiculoUseCase }
