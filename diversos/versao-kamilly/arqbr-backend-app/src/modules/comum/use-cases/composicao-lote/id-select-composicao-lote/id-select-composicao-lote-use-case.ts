import { inject, injectable } from "tsyringe"
import { IComposicaoLoteRepository } from '@modules/comum/repositories/i-composicao-lote-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectComposicaoLoteUseCase {
  constructor(
    @inject('ComposicaoLoteRepository')
    private composicaoLoteRepository: IComposicaoLoteRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const composicaoLote = await this.composicaoLoteRepository.idSelect(id)

    return composicaoLote
  }
}

export { IdSelectComposicaoLoteUseCase }
