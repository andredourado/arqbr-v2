import { inject, injectable } from 'tsyringe'
import { Departamento } from '@modules/clientes/infra/typeorm/entities/departamento'
import { IDepartamentoRepository } from '@modules/clientes/repositories/i-departamento-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetDepartamentoUseCase {
  constructor(
    @inject('DepartamentoRepository')
    private departamentoRepository: IDepartamentoRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const departamento = await this.departamentoRepository.get(id)

    return departamento
  }
}

export { GetDepartamentoUseCase }
