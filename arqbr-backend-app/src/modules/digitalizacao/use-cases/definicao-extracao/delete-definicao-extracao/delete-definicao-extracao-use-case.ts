import { inject, injectable } from 'tsyringe'
import { DefinicaoExtracao } from '@modules/digitalizacao/infra/typeorm/entities/definicao-extracao'
import { IDefinicaoExtracaoRepository } from '@modules/digitalizacao/repositories/i-definicao-extracao-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeleteDefinicaoExtracaoUseCase {
  constructor(
    @inject('DefinicaoExtracaoRepository')
    private definicaoExtracaoRepository: IDefinicaoExtracaoRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const definicaoExtracao = await this.definicaoExtracaoRepository.delete(id)

    return definicaoExtracao
  }
}

export { DeleteDefinicaoExtracaoUseCase }
