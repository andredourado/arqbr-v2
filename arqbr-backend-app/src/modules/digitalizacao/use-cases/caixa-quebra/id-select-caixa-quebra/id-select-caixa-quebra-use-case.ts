import { inject, injectable } from "tsyringe"
import { ICaixaQuebraRepository } from '@modules/digitalizacao/repositories/i-caixa-quebra-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectCaixaQuebraUseCase {
  constructor(
    @inject('CaixaQuebraRepository')
    private caixaQuebraRepository: ICaixaQuebraRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const caixaQuebra = await this.caixaQuebraRepository.idSelect(id)

    return caixaQuebra
  }
}

export { IdSelectCaixaQuebraUseCase }
