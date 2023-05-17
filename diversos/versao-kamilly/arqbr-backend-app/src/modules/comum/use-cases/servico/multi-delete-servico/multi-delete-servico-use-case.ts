import { inject, injectable } from 'tsyringe'
import { IServicoRepository } from '@modules/comum/repositories/i-servico-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteServicoUseCase {
  constructor(
    @inject('ServicoRepository')
    private servicoRepository: IServicoRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const servico = await this.servicoRepository.multiDelete(ids)

    return servico
  }
}

export { MultiDeleteServicoUseCase }
