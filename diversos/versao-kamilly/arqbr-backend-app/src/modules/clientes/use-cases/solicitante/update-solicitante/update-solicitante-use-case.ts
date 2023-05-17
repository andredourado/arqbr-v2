import { inject, injectable } from 'tsyringe'
import { Solicitante } from '@modules/clientes/infra/typeorm/entities/solicitante'
import { ISolicitanteRepository } from '@modules/clientes/repositories/i-solicitante-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  clienteId: string
  departamentoId: string
  nome: string
  email: string
  telefonesFixos: string
  celular: string
  gerenteDepartamento: boolean
  gestorContrato: boolean
  desabilitado: boolean
}

@injectable()
class UpdateSolicitanteUseCase {
  constructor(
    @inject('SolicitanteRepository')
    private solicitanteRepository: ISolicitanteRepository
  ) {}

  async execute({
    id,
    clienteId,
    departamentoId,
    nome,
    email,
    telefonesFixos,
    celular,
    gerenteDepartamento,
    gestorContrato,
    desabilitado
  }: IRequest): Promise<HttpResponse> {
    const solicitante = await this.solicitanteRepository.update({
      id,
      clienteId,
      departamentoId,
      nome,
      email,
      telefonesFixos,
      celular,
      gerenteDepartamento,
      gestorContrato,
      desabilitado
    })

    return solicitante
  }
}

export { UpdateSolicitanteUseCase }
