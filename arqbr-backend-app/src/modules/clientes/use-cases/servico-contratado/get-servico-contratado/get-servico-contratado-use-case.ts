import { inject, injectable } from 'tsyringe'
import { ServicoContratado } from '@modules/clientes/infra/typeorm/entities/servico-contratado'
import { IServicoContratadoRepository } from '@modules/clientes/repositories/i-servico-contratado-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetServicoContratadoUseCase {
  constructor(
    @inject('ServicoContratadoRepository')
    private servicoContratadoRepository: IServicoContratadoRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const servicoContratado = await this.servicoContratadoRepository.get(id)

    return servicoContratado
  }
}

export { GetServicoContratadoUseCase }
