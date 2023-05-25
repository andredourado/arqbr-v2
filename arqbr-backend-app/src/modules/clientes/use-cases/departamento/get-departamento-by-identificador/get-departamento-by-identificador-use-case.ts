import { inject, injectable } from 'tsyringe'
import { Departamento } from '@modules/clientes/infra/typeorm/entities/departamento'
import { IDepartamentoRepository } from '@modules/clientes/repositories/i-departamento-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetDepartamentoByIdentificadorUseCase {
  constructor(
    @inject('DepartamentoRepository')
    private departamentoRepository: IDepartamentoRepository
  ) {}

  async execute(identificador: string): Promise<HttpResponse> {
    const departamento = await this.departamentoRepository.getByIdentificador(identificador)

    return departamento
  }
}

export { GetDepartamentoByIdentificadorUseCase }
