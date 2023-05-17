import { inject, injectable } from 'tsyringe'
import { ComposicaoLote } from '@modules/comum/infra/typeorm/entities/composicao-lote'
import { IComposicaoLoteRepository } from '@modules/comum/repositories/i-composicao-lote-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetComposicaoLoteUseCase {
  constructor(
    @inject('ComposicaoLoteRepository')
    private composicaoLoteRepository: IComposicaoLoteRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const composicaoLote = await this.composicaoLoteRepository.get(id)

    return composicaoLote
  }
}

export { GetComposicaoLoteUseCase }
