import { inject, injectable } from 'tsyringe'
import { ServicoContratado } from '@modules/clientes/infra/typeorm/entities/servico-contratado'
import { IServicoContratadoRepository } from '@modules/clientes/repositories/i-servico-contratado-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeleteServicoContratadoUseCase {
  constructor(
    @inject('ServicoContratadoRepository')
    private servicoContratadoRepository: IServicoContratadoRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const servicoContratado = await this.servicoContratadoRepository.delete(id)

    return servicoContratado
  }
}

export { DeleteServicoContratadoUseCase }
