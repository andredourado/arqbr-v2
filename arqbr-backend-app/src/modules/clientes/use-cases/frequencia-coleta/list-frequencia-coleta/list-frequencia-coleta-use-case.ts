import { inject, injectable } from 'tsyringe'
import { IFrequenciaColetaRepository } from '@modules/clientes/repositories/i-frequencia-coleta-repository'
import { IFrequenciaColetaDTO } from '@modules/clientes/dtos/i-frequencia-coleta-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: IFrequenciaColetaDTO[],
  hasNext: boolean
}

@injectable()
class ListFrequenciaColetaUseCase {
  constructor(
    @inject('FrequenciaColetaRepository')
    private frequenciaColetaRepository: IFrequenciaColetaRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const frequenciaColetas = await this.frequenciaColetaRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countFrequenciaColetas = await this.frequenciaColetaRepository.count(
      search,
      filter
    )

    const numeroFrequenciaColeta = page * rowsPerPage

    const frequenciaColetasResponse = {
      items: frequenciaColetas.data,
      hasNext: numeroFrequenciaColeta < countFrequenciaColetas.data.count
    }

    return frequenciaColetasResponse
  }
}

export { ListFrequenciaColetaUseCase }
