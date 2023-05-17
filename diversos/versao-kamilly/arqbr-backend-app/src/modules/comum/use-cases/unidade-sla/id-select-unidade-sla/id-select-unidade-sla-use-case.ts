import { inject, injectable } from "tsyringe"
import { IUnidadeSlaRepository } from '@modules/comum/repositories/i-unidade-sla-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectUnidadeSlaUseCase {
  constructor(
    @inject('UnidadeSlaRepository')
    private unidadeSlaRepository: IUnidadeSlaRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const unidadeSla = await this.unidadeSlaRepository.idSelect(id)

    return unidadeSla
  }
}

export { IdSelectUnidadeSlaUseCase }
