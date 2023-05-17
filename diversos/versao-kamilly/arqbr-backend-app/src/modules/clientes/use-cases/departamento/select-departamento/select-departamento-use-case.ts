import { inject, injectable } from 'tsyringe'
import { IDepartamentoRepository } from '@modules/clientes/repositories/i-departamento-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectDepartamentoUseCase {
  constructor(
    @inject('DepartamentoRepository')
    private departamentoRepository: IDepartamentoRepository
  ) {}

  async execute({
    filter,
    clienteId
  }): Promise<ResponseProps> {
    const departamentos = await this.departamentoRepository.select(filter, clienteId)

    const newDepartamentos = {
      items: departamentos.data,
      hasNext: false
    }

    return newDepartamentos
  }
}

export { SelectDepartamentoUseCase }
