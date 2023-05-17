import { inject, injectable } from "tsyringe"
import { IUnidadeRepository } from '@modules/armazenamento/repositories/i-unidade-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectUnidadeUseCase {
  constructor(
    @inject('UnidadeRepository')
    private unidadeRepository: IUnidadeRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const unidade = await this.unidadeRepository.idSelect(id)

    return unidade
  }
}

export { IdSelectUnidadeUseCase }
