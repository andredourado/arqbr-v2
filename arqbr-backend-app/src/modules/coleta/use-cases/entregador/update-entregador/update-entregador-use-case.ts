import { inject, injectable } from 'tsyringe'
import { Entregador } from '@modules/coleta/infra/typeorm/entities/entregador'
import { IEntregadorRepository } from '@modules/coleta/repositories/i-entregador-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  cpfCnpj: string
  nome: string
  email: string
  endereco: string
  numero: string
  complemento: string
  cep: string
  telefonesFixos: string
  celular: string
  desabilitado: boolean
}

@injectable()
class UpdateEntregadorUseCase {
  constructor(
    @inject('EntregadorRepository')
    private entregadorRepository: IEntregadorRepository
  ) {}

  async execute({
    id,
    cpfCnpj,
    nome,
    email,
    endereco,
    numero,
    complemento,
    cep,
    telefonesFixos,
    celular,
    desabilitado
  }: IRequest): Promise<HttpResponse> {
    const entregador = await this.entregadorRepository.update({
      id,
      cpfCnpj,
      nome,
      email,
      endereco,
      numero,
      complemento,
      cep,
      telefonesFixos,
      celular,
      desabilitado
    })

    return entregador
  }
}

export { UpdateEntregadorUseCase }
