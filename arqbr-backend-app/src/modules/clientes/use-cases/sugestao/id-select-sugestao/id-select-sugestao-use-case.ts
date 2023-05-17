import { inject, injectable } from "tsyringe"
import { ISugestaoRepository } from '@modules/clientes/repositories/i-sugestao-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectSugestaoUseCase {
  constructor(
    @inject('SugestaoRepository')
    private sugestaoRepository: ISugestaoRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const sugestao = await this.sugestaoRepository.idSelect(id)

    return sugestao
  }
}

export { IdSelectSugestaoUseCase }
