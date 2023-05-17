import { inject, injectable } from 'tsyringe'
import { IColetaRepository } from '@modules/coleta/repositories/i-coleta-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteColetaUseCase {
  constructor(
    @inject('ColetaRepository')
    private coletaRepository: IColetaRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const coleta = await this.coletaRepository.multiDelete(ids)

    return coleta
  }
}

export { MultiDeleteColetaUseCase }
