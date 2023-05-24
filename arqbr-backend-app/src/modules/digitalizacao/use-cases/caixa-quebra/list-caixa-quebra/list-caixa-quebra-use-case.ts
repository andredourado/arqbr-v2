import { inject, injectable } from 'tsyringe'
import { ICaixaQuebraRepository } from '@modules/digitalizacao/repositories/i-caixa-quebra-repository'
import { ICaixaQuebraDTO } from '@modules/digitalizacao/dtos/i-caixa-quebra-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: ICaixaQuebraDTO[],
  hasNext: boolean
}

@injectable()
class ListCaixaQuebraUseCase {
  constructor(
    @inject('CaixaQuebraRepository')
    private caixaQuebraRepository: ICaixaQuebraRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const caixasQuebras = await this.caixaQuebraRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countCaixasQuebras = await this.caixaQuebraRepository.count(
      search,
      filter
    )

    const numeroCaixaQuebra = page * rowsPerPage

    const caixasQuebrasResponse = {
      items: caixasQuebras.data,
      hasNext: numeroCaixaQuebra < countCaixasQuebras.data.count
    }

    return caixasQuebrasResponse
  }
}

export { ListCaixaQuebraUseCase }
