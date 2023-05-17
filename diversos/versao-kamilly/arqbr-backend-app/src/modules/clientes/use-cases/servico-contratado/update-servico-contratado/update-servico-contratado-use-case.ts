import { inject, injectable } from 'tsyringe'
import { ServicoContratado } from '@modules/clientes/infra/typeorm/entities/servico-contratado'
import { IServicoContratadoRepository } from '@modules/clientes/repositories/i-servico-contratado-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  clienteId: string
  contratoId: string
  servicoId: string
  unidadeSlaId: string
  sla: number
  desabilitado: boolean
}

@injectable()
class UpdateServicoContratadoUseCase {
  constructor(
    @inject('ServicoContratadoRepository')
    private servicoContratadoRepository: IServicoContratadoRepository
  ) {}

  async execute({
    id,
    clienteId,
    contratoId,
    servicoId,
    unidadeSlaId,
    sla,
    desabilitado
  }: IRequest): Promise<HttpResponse> {
    const servicoContratado = await this.servicoContratadoRepository.update({
      id,
      clienteId,
      contratoId,
      servicoId,
      unidadeSlaId,
      sla,
      desabilitado
    })

    return servicoContratado
  }
}

export { UpdateServicoContratadoUseCase }
