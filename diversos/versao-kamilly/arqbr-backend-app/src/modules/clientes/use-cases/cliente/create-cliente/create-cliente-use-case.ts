import { inject, injectable } from 'tsyringe'
import { Cliente } from '@modules/clientes/infra/typeorm/entities/cliente'
import { IClienteRepository } from '@modules/clientes/repositories/i-cliente-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  cnpj: string
  nomeFantasia: string
  razaoSocial: string
  inscricaoEstadual: string
  endereco: string
  numero: string
  complemento: string
  estadoId: string
  cidadeId: string
  cep: string
  desabilitado: boolean
}

@injectable()
class CreateClienteUseCase {
  constructor(
    @inject('ClienteRepository')
    private clienteRepository: IClienteRepository
  ) {}

  async execute({
    cnpj,
    nomeFantasia,
    razaoSocial,
    inscricaoEstadual,
    endereco,
    numero,
    complemento,
    estadoId,
    cidadeId,
    cep,
    desabilitado
  }: IRequest): Promise<Cliente> {
    const result = await this.clienteRepository.create({
        cnpj,
        nomeFantasia,
        razaoSocial,
        inscricaoEstadual,
        endereco,
        numero,
        complemento,
        estadoId,
        cidadeId,
        cep,
        desabilitado
      })
      .then(clienteResult => {
        return clienteResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateClienteUseCase }
