import { inject, injectable } from 'tsyringe'
import { IServicoContratadoRepository } from '@modules/clientes/repositories/i-servico-contratado-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteServicoContratadoUseCase {
  constructor(
    @inject('ServicoContratadoRepository')
    private servicoContratadoRepository: IServicoContratadoRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const servicoContratado = await this.servicoContratadoRepository.multiDelete(ids)

    return servicoContratado
  }
}

export { MultiDeleteServicoContratadoUseCase }
