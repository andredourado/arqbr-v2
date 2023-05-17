import { inject, injectable } from 'tsyringe'
import { Contrato } from '@modules/clientes/infra/typeorm/entities/contrato'
import { IContratoRepository } from '@modules/clientes/repositories/i-contrato-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeleteContratoUseCase {
  constructor(
    @inject('ContratoRepository')
    private contratoRepository: IContratoRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const contrato = await this.contratoRepository.delete(id)

    return contrato
  }
}

export { DeleteContratoUseCase }
