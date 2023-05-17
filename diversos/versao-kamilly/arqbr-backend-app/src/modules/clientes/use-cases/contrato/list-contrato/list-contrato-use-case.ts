import { inject, injectable } from 'tsyringe'
import { IContratoRepository } from '@modules/clientes/repositories/i-contrato-repository'
import { IContratoDTO } from '@modules/clientes/dtos/i-contrato-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string
}

interface ResponseProps {
  items: IContratoDTO[],
  hasNext: boolean
}

@injectable()
class ListContratoUseCase {
  constructor(
    @inject('ContratoRepository')
    private contratoRepository: IContratoRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = ''
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const contratos = await this.contratoRepository.list(
      search,
      newPage,
      rowsPerPage,
      order
    )

    const countContratos = await this.contratoRepository.count(
      search
    )

    const numeroContrato = page * rowsPerPage

    const contratosResponse = {
      items: contratos.data,
      hasNext: numeroContrato < countContratos.data.count
    }

    return contratosResponse
  }
}

export { ListContratoUseCase }
