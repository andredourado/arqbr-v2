import { inject, injectable } from "tsyringe"
import { IServicoContratadoRepository } from '@modules/clientes/repositories/i-servico-contratado-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectServicoContratadoUseCase {
  constructor(
    @inject('ServicoContratadoRepository')
    private servicoContratadoRepository: IServicoContratadoRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const servicoContratado = await this.servicoContratadoRepository.idSelect(id)

    return servicoContratado
  }
}

export { IdSelectServicoContratadoUseCase }
