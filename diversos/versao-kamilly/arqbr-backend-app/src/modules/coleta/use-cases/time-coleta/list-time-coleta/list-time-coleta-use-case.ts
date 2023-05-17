import { inject, injectable } from 'tsyringe'
import { ITimeColetaRepository } from '@modules/coleta/repositories/i-time-coleta-repository'
import { ITimeColetaDTO } from '@modules/coleta/dtos/i-time-coleta-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string
}

interface ResponseProps {
  items: ITimeColetaDTO[],
  hasNext: boolean
}

@injectable()
class ListTimeColetaUseCase {
  constructor(
    @inject('TimeColetaRepository')
    private timeColetaRepository: ITimeColetaRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = ''
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const timesColeta = await this.timeColetaRepository.list(
      search,
      newPage,
      rowsPerPage,
      order
    )

    const countTimesColeta = await this.timeColetaRepository.count(
      search
    )

    const numeroTimeColeta = page * rowsPerPage

    const timesColetaResponse = {
      items: timesColeta.data,
      hasNext: numeroTimeColeta < countTimesColeta.data.count
    }

    return timesColetaResponse
  }
}

export { ListTimeColetaUseCase }
