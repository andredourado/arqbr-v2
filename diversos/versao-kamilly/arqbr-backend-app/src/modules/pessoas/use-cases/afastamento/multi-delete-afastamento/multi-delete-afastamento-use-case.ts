import { inject, injectable } from 'tsyringe'
import { IAfastamentoRepository } from '@modules/pessoas/repositories/i-afastamento-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteAfastamentoUseCase {
  constructor(
    @inject('AfastamentoRepository')
    private afastamentoRepository: IAfastamentoRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const afastamento = await this.afastamentoRepository.multiDelete(ids)

    return afastamento
  }
}

export { MultiDeleteAfastamentoUseCase }
