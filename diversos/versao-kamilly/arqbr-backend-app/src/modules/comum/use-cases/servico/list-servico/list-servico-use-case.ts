import { inject, injectable } from 'tsyringe'
import { IServicoRepository } from '@modules/comum/repositories/i-servico-repository'
import { IServicoDTO } from '@modules/comum/dtos/i-servico-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string
}

interface ResponseProps {
  items: IServicoDTO[],
  hasNext: boolean
}

@injectable()
class ListServicoUseCase {
  constructor(
    @inject('ServicoRepository')
    private servicoRepository: IServicoRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = ''
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const servicos = await this.servicoRepository.list(
      search,
      newPage,
      rowsPerPage,
      order
    )

    const countServicos = await this.servicoRepository.count(
      search
    )

    const numeroServico = page * rowsPerPage

    const servicosResponse = {
      items: servicos.data,
      hasNext: numeroServico < countServicos.data.count
    }

    return servicosResponse
  }
}

export { ListServicoUseCase }
