import { inject, injectable } from 'tsyringe'
import { IDefinicaoExtracaoRepository } from '@modules/digitalizacao/repositories/i-definicao-extracao-repository'
import { IDefinicaoExtracaoDTO } from '@modules/digitalizacao/dtos/i-definicao-extracao-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: IDefinicaoExtracaoDTO[],
  hasNext: boolean
}

@injectable()
class ListDefinicaoExtracaoUseCase {
  constructor(
    @inject('DefinicaoExtracaoRepository')
    private definicaoExtracaoRepository: IDefinicaoExtracaoRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const definicoesExtracao = await this.definicaoExtracaoRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countDefinicoesExtracao = await this.definicaoExtracaoRepository.count(
      search,
      filter
    )

    const numeroCaixaQuebra = page * rowsPerPage

    const definicoesExtracaoResponse = {
      items: definicoesExtracao.data,
      hasNext: numeroCaixaQuebra < definicoesExtracao.data.count
    }

    return definicoesExtracaoResponse
  }
}

export { ListDefinicaoExtracaoUseCase }
