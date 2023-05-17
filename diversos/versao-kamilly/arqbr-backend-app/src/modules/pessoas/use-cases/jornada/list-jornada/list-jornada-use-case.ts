import { inject, injectable } from 'tsyringe'
import { IJornadaRepository } from '@modules/pessoas/repositories/i-jornada-repository'
import { IJornadaDTO } from '@modules/pessoas/dtos/i-jornada-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string
}

interface ResponseProps {
  items: IJornadaDTO[],
  hasNext: boolean
}

@injectable()
class ListJornadaUseCase {
  constructor(
    @inject('JornadaRepository')
    private jornadaRepository: IJornadaRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = ''
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const jornadas = await this.jornadaRepository.list(
      search,
      newPage,
      rowsPerPage,
      order
    )

    const countJornadas = await this.jornadaRepository.count(
      search
    )

    const numeroJornada = page * rowsPerPage

    const jornadasResponse = {
      items: jornadas.data,
      hasNext: numeroJornada < countJornadas.data.count
    }

    return jornadasResponse
  }
}

export { ListJornadaUseCase }
