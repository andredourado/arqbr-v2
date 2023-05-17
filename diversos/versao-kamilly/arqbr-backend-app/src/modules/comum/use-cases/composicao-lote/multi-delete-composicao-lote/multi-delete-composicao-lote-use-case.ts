import { inject, injectable } from 'tsyringe'
import { IComposicaoLoteRepository } from '@modules/comum/repositories/i-composicao-lote-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteComposicaoLoteUseCase {
  constructor(
    @inject('ComposicaoLoteRepository')
    private composicaoLoteRepository: IComposicaoLoteRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const composicaoLote = await this.composicaoLoteRepository.multiDelete(ids)

    return composicaoLote
  }
}

export { MultiDeleteComposicaoLoteUseCase }
