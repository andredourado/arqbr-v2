import { inject, injectable } from 'tsyringe'
import { IDepartamentoRepository } from '@modules/clientes/repositories/i-departamento-repository'
import { IDepartamentoDTO } from '@modules/clientes/dtos/i-departamento-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string
}

interface ResponseProps {
  items: IDepartamentoDTO[],
  hasNext: boolean
}

@injectable()
class ListDepartamentoUseCase {
  constructor(
    @inject('DepartamentoRepository')
    private departamentoRepository: IDepartamentoRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = ''
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const departamentos = await this.departamentoRepository.list(
      search,
      newPage,
      rowsPerPage,
      order
    )

    const countDepartamentos = await this.departamentoRepository.count(
      search
    )

    const numeroDepartamento = page * rowsPerPage

    const departamentosResponse = {
      items: departamentos.data,
      hasNext: numeroDepartamento < countDepartamentos.data.count
    }

    return departamentosResponse
  }
}

export { ListDepartamentoUseCase }
