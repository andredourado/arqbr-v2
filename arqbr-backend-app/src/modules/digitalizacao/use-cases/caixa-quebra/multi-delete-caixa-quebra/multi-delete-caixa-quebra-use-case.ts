import { inject, injectable } from 'tsyringe'
import { ICaixaQuebraRepository } from '@modules/digitalizacao/repositories/i-caixa-quebra-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteCaixaQuebraUseCase {
  constructor(
    @inject('CaixaQuebraRepository')
    private caixaQuebraRepository: ICaixaQuebraRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const caixaQuebra = await this.caixaQuebraRepository.multiDelete(ids)

    return caixaQuebra
  }
}

export { MultiDeleteCaixaQuebraUseCase }
