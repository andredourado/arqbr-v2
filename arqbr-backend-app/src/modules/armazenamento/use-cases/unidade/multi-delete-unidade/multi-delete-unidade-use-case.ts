import { inject, injectable } from 'tsyringe'
import { IUnidadeRepository } from '@modules/armazenamento/repositories/i-unidade-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteUnidadeUseCase {
  constructor(
    @inject('UnidadeRepository')
    private unidadeRepository: IUnidadeRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const unidade = await this.unidadeRepository.multiDelete(ids)

    return unidade
  }
}

export { MultiDeleteUnidadeUseCase }
