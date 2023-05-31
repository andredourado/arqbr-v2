import { inject, injectable } from "tsyringe"
import { IDefinicaoExtracaoRepository } from '@modules/digitalizacao/repositories/i-definicao-extracao-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectDefinicaoExtracaoUseCase {
  constructor(
    @inject('DefinicaoExtracaoRepository')
    private definicaoExtracaoRepository: IDefinicaoExtracaoRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const definicaoExtracao = await this.definicaoExtracaoRepository.idSelect(id)

    return definicaoExtracao
  }
}

export { IdSelectDefinicaoExtracaoUseCase }
