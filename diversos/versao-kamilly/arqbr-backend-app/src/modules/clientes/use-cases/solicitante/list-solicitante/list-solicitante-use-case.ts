import { inject, injectable } from 'tsyringe'
import { ISolicitanteRepository } from '@modules/clientes/repositories/i-solicitante-repository'
import { ISolicitanteDTO } from '@modules/clientes/dtos/i-solicitante-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string
}

interface ResponseProps {
  items: ISolicitanteDTO[],
  hasNext: boolean
}

@injectable()
class ListSolicitanteUseCase {
  constructor(
    @inject('SolicitanteRepository')
    private solicitanteRepository: ISolicitanteRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = ''
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const solicitantes = await this.solicitanteRepository.list(
      search,
      newPage,
      rowsPerPage,
      order
    )

    const countSolicitantes = await this.solicitanteRepository.count(
      search
    )

    const numeroSolicitante = page * rowsPerPage

    const solicitantesResponse = {
      items: solicitantes.data,
      hasNext: numeroSolicitante < countSolicitantes.data.count
    }

    return solicitantesResponse
  }
}

export { ListSolicitanteUseCase }
