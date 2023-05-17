import { inject, injectable } from 'tsyringe'
import { IUnidadeSlaRepository } from '@modules/comum/repositories/i-unidade-sla-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteUnidadeSlaUseCase {
  constructor(
    @inject('UnidadeSlaRepository')
    private unidadeSlaRepository: IUnidadeSlaRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const unidadeSla = await this.unidadeSlaRepository.multiDelete(ids)

    return unidadeSla
  }
}

export { MultiDeleteUnidadeSlaUseCase }
