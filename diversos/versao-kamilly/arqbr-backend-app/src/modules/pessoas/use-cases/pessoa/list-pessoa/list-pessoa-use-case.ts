import { inject, injectable } from 'tsyringe'
import { IPessoaRepository } from '@modules/pessoas/repositories/i-pessoa-repository'
import { IPessoaDTO } from '@modules/pessoas/dtos/i-pessoa-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string
}

interface ResponseProps {
  items: IPessoaDTO[],
  hasNext: boolean
}

@injectable()
class ListPessoaUseCase {
  constructor(
    @inject('PessoaRepository')
    private pessoaRepository: IPessoaRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = ''
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const pessoas = await this.pessoaRepository.list(
      search,
      newPage,
      rowsPerPage,
      order
    )

    const countPessoas = await this.pessoaRepository.count(
      search
    )

    const numeroPessoa = page * rowsPerPage

    const pessoasResponse = {
      items: pessoas.data,
      hasNext: numeroPessoa < countPessoas.data.count
    }

    return pessoasResponse
  }
}

export { ListPessoaUseCase }
