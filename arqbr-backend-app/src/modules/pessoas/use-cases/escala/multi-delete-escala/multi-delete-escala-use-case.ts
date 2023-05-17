import { inject, injectable } from 'tsyringe'
import { IEscalaRepository } from '@modules/pessoas/repositories/i-escala-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteEscalaUseCase {
  constructor(
    @inject('EscalaRepository')
    private escalaRepository: IEscalaRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const escala = await this.escalaRepository.multiDelete(ids)

    return escala
  }
}

export { MultiDeleteEscalaUseCase }
