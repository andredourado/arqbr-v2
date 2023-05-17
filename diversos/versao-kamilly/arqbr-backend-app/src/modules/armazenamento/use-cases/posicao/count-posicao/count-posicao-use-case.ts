import { inject, injectable } from 'tsyringe'
import { Posicao } from '@modules/armazenamento/infra/typeorm/entities/posicao'
import { IPosicaoRepository } from '@modules/armazenamento/repositories/i-posicao-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
}

@injectable()
class CountPosicaoUseCase {
  constructor(
    @inject('PosicaoRepository')
    private posicaoRepository: IPosicaoRepository
  ) {}

  async execute({
    search
  }: IRequest): Promise<HttpResponse> {
    const posicoesCount = await this.posicaoRepository.count(
      search
    )

    return posicoesCount
  }
}

export { CountPosicaoUseCase }
