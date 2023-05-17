import { inject, injectable } from "tsyringe"
import { IAfastamentoRepository } from '@modules/pessoas/repositories/i-afastamento-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectAfastamentoUseCase {
  constructor(
    @inject('AfastamentoRepository')
    private afastamentoRepository: IAfastamentoRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const afastamento = await this.afastamentoRepository.idSelect(id)

    return afastamento
  }
}

export { IdSelectAfastamentoUseCase }
