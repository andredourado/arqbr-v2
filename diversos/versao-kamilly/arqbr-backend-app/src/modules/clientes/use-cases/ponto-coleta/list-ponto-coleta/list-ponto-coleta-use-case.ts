import { inject, injectable } from 'tsyringe'
import { IPontoColetaRepository } from '@modules/clientes/repositories/i-ponto-coleta-repository'
import { IPontoColetaDTO } from '@modules/clientes/dtos/i-ponto-coleta-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string
}

interface ResponseProps {
  items: IPontoColetaDTO[],
  hasNext: boolean
}

@injectable()
class ListPontoColetaUseCase {
  constructor(
    @inject('PontoColetaRepository')
    private pontoColetaRepository: IPontoColetaRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = ''
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const pontosColeta = await this.pontoColetaRepository.list(
      search,
      newPage,
      rowsPerPage,
      order
    )

    const countPontosColeta = await this.pontoColetaRepository.count(
      search
    )

    const numeroPontoColeta = page * rowsPerPage

    const pontosColetaResponse = {
      items: pontosColeta.data,
      hasNext: numeroPontoColeta < countPontosColeta.data.count
    }

    return pontosColetaResponse
  }
}

export { ListPontoColetaUseCase }
