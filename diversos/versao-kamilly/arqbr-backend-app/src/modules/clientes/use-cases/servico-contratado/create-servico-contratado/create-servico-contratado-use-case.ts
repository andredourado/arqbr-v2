import { inject, injectable } from 'tsyringe'
import { ServicoContratado } from '@modules/clientes/infra/typeorm/entities/servico-contratado'
import { IServicoContratadoRepository } from '@modules/clientes/repositories/i-servico-contratado-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  clienteId: string
  contratoId: string
  servicoId: string
  unidadeSlaId: string
  sla: number
  desabilitado: boolean
}

@injectable()
class CreateServicoContratadoUseCase {
  constructor(
    @inject('ServicoContratadoRepository')
    private servicoContratadoRepository: IServicoContratadoRepository
  ) {}

  async execute({
    clienteId,
    contratoId,
    servicoId,
    unidadeSlaId,
    sla,
    desabilitado
  }: IRequest): Promise<ServicoContratado> {
    const result = await this.servicoContratadoRepository.create({
        clienteId,
        contratoId,
        servicoId,
        unidadeSlaId,
        sla,
        desabilitado
      })
      .then(servicoContratadoResult => {
        return servicoContratadoResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateServicoContratadoUseCase }
