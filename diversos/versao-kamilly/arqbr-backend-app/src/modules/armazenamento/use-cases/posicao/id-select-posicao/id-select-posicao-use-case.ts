import { inject, injectable } from "tsyringe"
import { IPosicaoRepository } from '@modules/armazenamento/repositories/i-posicao-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectPosicaoUseCase {
  constructor(
    @inject('PosicaoRepository')
    private posicaoRepository: IPosicaoRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const posicao = await this.posicaoRepository.idSelect(id)

    return posicao
  }
}

export { IdSelectPosicaoUseCase }
