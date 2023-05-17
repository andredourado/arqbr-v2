import { inject, injectable } from 'tsyringe'
import { IFrequenciaRepository } from '@modules/comum/repositories/i-frequencia-repository'
import { IFrequenciaDTO } from '@modules/comum/dtos/i-frequencia-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string
}

interface ResponseProps {
  items: IFrequenciaDTO[],
  hasNext: boolean
}

@injectable()
class ListFrequenciaUseCase {
  constructor(
    @inject('FrequenciaRepository')
    private frequenciaRepository: IFrequenciaRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = ''
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const frequencias = await this.frequenciaRepository.list(
      search,
      newPage,
      rowsPerPage,
      order
    )

    const countFrequencias = await this.frequenciaRepository.count(
      search
    )

    const numeroFrequencia = page * rowsPerPage

    const frequenciasResponse = {
      items: frequencias.data,
      hasNext: numeroFrequencia < countFrequencias.data.count
    }

    return frequenciasResponse
  }
}

export { ListFrequenciaUseCase }
