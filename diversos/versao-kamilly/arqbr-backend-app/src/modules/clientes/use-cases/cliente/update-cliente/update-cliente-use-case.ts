import { inject, injectable } from 'tsyringe'
import { Cliente } from '@modules/clientes/infra/typeorm/entities/cliente'
import { IClienteRepository } from '@modules/clientes/repositories/i-cliente-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
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
class UpdateClienteUseCase {
  constructor(
    @inject('ClienteRepository')
    private clienteRepository: IClienteRepository
  ) {}

  async execute({
    id,
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
  }: IRequest): Promise<HttpResponse> {
    const cliente = await this.clienteRepository.update({
      id,
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

    return cliente
  }
}

export { UpdateClienteUseCase }
