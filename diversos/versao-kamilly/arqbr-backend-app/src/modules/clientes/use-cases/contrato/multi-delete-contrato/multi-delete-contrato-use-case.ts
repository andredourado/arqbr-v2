import { inject, injectable } from 'tsyringe'
import { IContratoRepository } from '@modules/clientes/repositories/i-contrato-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteContratoUseCase {
  constructor(
    @inject('ContratoRepository')
    private contratoRepository: IContratoRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const contrato = await this.contratoRepository.multiDelete(ids)

    return contrato
  }
}

export { MultiDeleteContratoUseCase }
