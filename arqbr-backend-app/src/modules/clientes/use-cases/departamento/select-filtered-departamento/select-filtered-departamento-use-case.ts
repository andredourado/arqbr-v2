import { inject, injectable } from 'tsyringe'
import { IDepartamentoRepository } from '@modules/clientes/repositories/i-departamento-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectFilteredDepartamentoUseCase {
  constructor(
    @inject('DepartamentoRepository')
    private departamentoRepository: IDepartamentoRepository
  ) {}

  async execute({
    filter,
    clienteId
  }): Promise<ResponseProps> {
    const departamentos = await this.departamentoRepository.selectFiltered(filter, clienteId)

    const newDepartamentos = {
      items: departamentos.data,
      hasNext: false
    }

    return newDepartamentos
  }
}

export { SelectFilteredDepartamentoUseCase }
