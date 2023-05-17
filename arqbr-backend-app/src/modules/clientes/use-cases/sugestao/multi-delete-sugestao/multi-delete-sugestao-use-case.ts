import { inject, injectable } from 'tsyringe'
import { ISugestaoRepository } from '@modules/clientes/repositories/i-sugestao-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteSugestaoUseCase {
  constructor(
    @inject('SugestaoRepository')
    private sugestaoRepository: ISugestaoRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const sugestao = await this.sugestaoRepository.multiDelete(ids)

    return sugestao
  }
}

export { MultiDeleteSugestaoUseCase }
