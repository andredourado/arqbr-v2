import { inject, injectable } from "tsyringe"
import { IColetaRepository } from '@modules/coleta/repositories/i-coleta-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectColetaUseCase {
  constructor(
    @inject('ColetaRepository')
    private coletaRepository: IColetaRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const coleta = await this.coletaRepository.idSelect(id)

    return coleta
  }
}

export { IdSelectColetaUseCase }
