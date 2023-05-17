import { inject, injectable } from 'tsyringe'
import { ComposicaoLote } from '@modules/comum/infra/typeorm/entities/composicao-lote'
import { IComposicaoLoteRepository } from '@modules/comum/repositories/i-composicao-lote-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
}

@injectable()
class CountComposicaoLoteUseCase {
  constructor(
    @inject('ComposicaoLoteRepository')
    private composicaoLoteRepository: IComposicaoLoteRepository
  ) {}

  async execute({
    search
  }: IRequest): Promise<HttpResponse> {
    const composicaoLotesCount = await this.composicaoLoteRepository.count(
      search
    )

    return composicaoLotesCount
  }
}

export { CountComposicaoLoteUseCase }
