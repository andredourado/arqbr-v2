import { inject, injectable } from 'tsyringe'
import { Departamento } from '@modules/clientes/infra/typeorm/entities/departamento'
import { IDepartamentoRepository } from '@modules/clientes/repositories/i-departamento-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountDepartamentoUseCase {
  constructor(
    @inject('DepartamentoRepository')
    private departamentoRepository: IDepartamentoRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const departamentosCount = await this.departamentoRepository.count(
      search,
      filter
    )

    return departamentosCount
  }
}

export { CountDepartamentoUseCase }
