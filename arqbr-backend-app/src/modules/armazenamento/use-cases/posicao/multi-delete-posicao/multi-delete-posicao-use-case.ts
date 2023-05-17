import { inject, injectable } from 'tsyringe'
import { IPosicaoRepository } from '@modules/armazenamento/repositories/i-posicao-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeletePosicaoUseCase {
  constructor(
    @inject('PosicaoRepository')
    private posicaoRepository: IPosicaoRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const posicao = await this.posicaoRepository.multiDelete(ids)

    return posicao
  }
}

export { MultiDeletePosicaoUseCase }
