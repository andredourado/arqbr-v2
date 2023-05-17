import { inject, injectable } from 'tsyringe'
import { Contrato } from '@modules/clientes/infra/typeorm/entities/contrato'
import { IContratoRepository } from '@modules/clientes/repositories/i-contrato-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetContratoUseCase {
  constructor(
    @inject('ContratoRepository')
    private contratoRepository: IContratoRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const contrato = await this.contratoRepository.get(id)

    return contrato
  }
}

export { GetContratoUseCase }
