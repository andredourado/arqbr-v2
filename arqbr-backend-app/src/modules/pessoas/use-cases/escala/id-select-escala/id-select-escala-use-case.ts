import { inject, injectable } from "tsyringe"
import { IEscalaRepository } from '@modules/pessoas/repositories/i-escala-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectEscalaUseCase {
  constructor(
    @inject('EscalaRepository')
    private escalaRepository: IEscalaRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const escala = await this.escalaRepository.idSelect(id)

    return escala
  }
}

export { IdSelectEscalaUseCase }
