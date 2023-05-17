import { inject, injectable } from 'tsyringe'
import { Posicao } from '@modules/armazenamento/infra/typeorm/entities/posicao'
import { IPosicaoRepository } from '@modules/armazenamento/repositories/i-posicao-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountPosicaoUseCase {
  constructor(
    @inject('PosicaoRepository')
    private posicaoRepository: IPosicaoRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const posicoesCount = await this.posicaoRepository.count(
      search,
      filter
    )

    return posicoesCount
  }
}

export { CountPosicaoUseCase }
