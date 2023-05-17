import { inject, injectable } from 'tsyringe'
import { IFuncaoRepository } from '@modules/pessoas/repositories/i-funcao-repository'
import { IFuncaoDTO } from '@modules/pessoas/dtos/i-funcao-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string
}

interface ResponseProps {
  items: IFuncaoDTO[],
  hasNext: boolean
}

@injectable()
class ListFuncaoUseCase {
  constructor(
    @inject('FuncaoRepository')
    private funcaoRepository: IFuncaoRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = ''
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const funcoes = await this.funcaoRepository.list(
      search,
      newPage,
      rowsPerPage,
      order
    )

    const countFuncoes = await this.funcaoRepository.count(
      search
    )

    const numeroFuncao = page * rowsPerPage

    const funcoesResponse = {
      items: funcoes.data,
      hasNext: numeroFuncao < countFuncoes.data.count
    }

    return funcoesResponse
  }
}

export { ListFuncaoUseCase }
