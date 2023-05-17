import { inject, injectable } from 'tsyringe'
import { ISugestaoRepository } from '@modules/clientes/repositories/i-sugestao-repository'
import { ISugestaoDTO } from '@modules/clientes/dtos/i-sugestao-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: ISugestaoDTO[],
  hasNext: boolean
}

@injectable()
class ListSugestaoUseCase {
  constructor(
    @inject('SugestaoRepository')
    private sugestaoRepository: ISugestaoRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const sugestoes = await this.sugestaoRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countSugestoes = await this.sugestaoRepository.count(
      search,
      filter
    )

    const numeroSugestao = page * rowsPerPage

    const sugestoesResponse = {
      items: sugestoes.data,
      hasNext: numeroSugestao < countSugestoes.data.count
    }

    return sugestoesResponse
  }
}

export { ListSugestaoUseCase }
