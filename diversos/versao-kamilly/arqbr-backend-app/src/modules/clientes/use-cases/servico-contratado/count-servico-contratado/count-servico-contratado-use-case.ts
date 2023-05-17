import { inject, injectable } from 'tsyringe'
import { ServicoContratado } from '@modules/clientes/infra/typeorm/entities/servico-contratado'
import { IServicoContratadoRepository } from '@modules/clientes/repositories/i-servico-contratado-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
}

@injectable()
class CountServicoContratadoUseCase {
  constructor(
    @inject('ServicoContratadoRepository')
    private servicoContratadoRepository: IServicoContratadoRepository
  ) {}

  async execute({
    search
  }: IRequest): Promise<HttpResponse> {
    const servicosContratadosCount = await this.servicoContratadoRepository.count(
      search
    )

    return servicosContratadosCount
  }
}

export { CountServicoContratadoUseCase }
