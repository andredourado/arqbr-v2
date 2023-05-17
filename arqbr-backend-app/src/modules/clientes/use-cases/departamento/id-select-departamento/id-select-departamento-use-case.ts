import { inject, injectable } from "tsyringe"
import { IDepartamentoRepository } from '@modules/clientes/repositories/i-departamento-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectDepartamentoUseCase {
  constructor(
    @inject('DepartamentoRepository')
    private departamentoRepository: IDepartamentoRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const departamento = await this.departamentoRepository.idSelect(id)

    return departamento
  }
}

export { IdSelectDepartamentoUseCase }
