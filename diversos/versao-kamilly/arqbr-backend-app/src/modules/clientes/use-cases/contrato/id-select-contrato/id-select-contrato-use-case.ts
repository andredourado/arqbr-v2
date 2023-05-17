import { inject, injectable } from "tsyringe"
import { IContratoRepository } from '@modules/clientes/repositories/i-contrato-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectContratoUseCase {
  constructor(
    @inject('ContratoRepository')
    private contratoRepository: IContratoRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const contrato = await this.contratoRepository.idSelect(id)

    return contrato
  }
}

export { IdSelectContratoUseCase }
