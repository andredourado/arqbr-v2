import { inject, injectable } from 'tsyringe'
import { IComposicaoLoteRepository } from '@modules/comum/repositories/i-composicao-lote-repository'
import { IComposicaoLoteDTO } from '@modules/comum/dtos/i-composicao-lote-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string
}

interface ResponseProps {
  items: IComposicaoLoteDTO[],
  hasNext: boolean
}

@injectable()
class ListComposicaoLoteUseCase {
  constructor(
    @inject('ComposicaoLoteRepository')
    private composicaoLoteRepository: IComposicaoLoteRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = ''
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const composicaoLotes = await this.composicaoLoteRepository.list(
      search,
      newPage,
      rowsPerPage,
      order
    )

    const countComposicaoLotes = await this.composicaoLoteRepository.count(
      search
    )

    const numeroComposicaoLote = page * rowsPerPage

    const composicaoLotesResponse = {
      items: composicaoLotes.data,
      hasNext: numeroComposicaoLote < countComposicaoLotes.data.count
    }

    return composicaoLotesResponse
  }
}

export { ListComposicaoLoteUseCase }
