import { inject, injectable } from 'tsyringe'
import { IDepartamentoRepository } from '@modules/clientes/repositories/i-departamento-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteDepartamentoUseCase {
  constructor(
    @inject('DepartamentoRepository')
    private departamentoRepository: IDepartamentoRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const departamento = await this.departamentoRepository.multiDelete(ids)

    return departamento
  }
}

export { MultiDeleteDepartamentoUseCase }
