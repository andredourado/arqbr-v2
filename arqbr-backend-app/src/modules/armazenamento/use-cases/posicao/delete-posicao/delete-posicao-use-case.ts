import { inject, injectable } from 'tsyringe'
import { Posicao } from '@modules/armazenamento/infra/typeorm/entities/posicao'
import { IPosicaoRepository } from '@modules/armazenamento/repositories/i-posicao-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeletePosicaoUseCase {
  constructor(
    @inject('PosicaoRepository')
    private posicaoRepository: IPosicaoRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const posicao = await this.posicaoRepository.delete(id)

    return posicao
  }
}

export { DeletePosicaoUseCase }
