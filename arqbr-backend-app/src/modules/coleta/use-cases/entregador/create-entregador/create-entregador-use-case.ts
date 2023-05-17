import { inject, injectable } from 'tsyringe'
import { Entregador } from '@modules/coleta/infra/typeorm/entities/entregador'
import { IEntregadorRepository } from '@modules/coleta/repositories/i-entregador-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
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
class CreateEntregadorUseCase {
  constructor(
    @inject('EntregadorRepository')
    private entregadorRepository: IEntregadorRepository
  ) {}

  async execute({
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
  }: IRequest): Promise<Entregador> {
    const result = await this.entregadorRepository.create({
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
      .then(entregadorResult => {
        return entregadorResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateEntregadorUseCase }
