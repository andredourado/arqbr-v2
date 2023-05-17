import { inject, injectable } from 'tsyringe'
import { IPosicaoRepository } from '@modules/armazenamento/repositories/i-posicao-repository'
import { IPosicaoDTO } from '@modules/armazenamento/dtos/i-posicao-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: IPosicaoDTO[],
  hasNext: boolean
}

@injectable()
class ListPosicaoUseCase {
  constructor(
    @inject('PosicaoRepository')
    private posicaoRepository: IPosicaoRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const posicoes = await this.posicaoRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countPosicoes = await this.posicaoRepository.count(
      search,
      filter
    )

    const numeroPosicao = page * rowsPerPage

    const posicoesResponse = {
      items: posicoes.data,
      hasNext: numeroPosicao < countPosicoes.data.count
    }

    return posicoesResponse
  }
}

export { ListPosicaoUseCase }
