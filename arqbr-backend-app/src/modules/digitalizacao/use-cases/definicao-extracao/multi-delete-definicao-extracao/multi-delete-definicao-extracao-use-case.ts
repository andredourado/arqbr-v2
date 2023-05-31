import { inject, injectable } from 'tsyringe'
import { IDefinicaoExtracaoRepository } from '@modules/digitalizacao/repositories/i-definicao-extracao-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteDefinicaoExtracaoUseCase {
  constructor(
    @inject('DefinicaoExtracaoRepository')
    private definicaoExtracaoRepository: IDefinicaoExtracaoRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const definicaoExtracao = await this.definicaoExtracaoRepository.multiDelete(ids)

    return definicaoExtracao
  }
}

export { MultiDeleteDefinicaoExtracaoUseCase }
