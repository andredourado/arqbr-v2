import { inject, injectable } from 'tsyringe'
import { ServicoContratado } from '@modules/clientes/infra/typeorm/entities/servico-contratado'
import { IServicoContratadoRepository } from '@modules/clientes/repositories/i-servico-contratado-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  clienteId: string
  descricao: string
  sla: string
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
    descricao,
    sla,
    desabilitado
  }: IRequest): Promise<ServicoContratado> {
    const result = await this.servicoContratadoRepository.create({
        clienteId,
        descricao,
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
