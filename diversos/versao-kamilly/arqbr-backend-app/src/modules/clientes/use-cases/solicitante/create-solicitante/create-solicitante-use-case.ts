import { inject, injectable } from 'tsyringe'
import { Solicitante } from '@modules/clientes/infra/typeorm/entities/solicitante'
import { ISolicitanteRepository } from '@modules/clientes/repositories/i-solicitante-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
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
class CreateSolicitanteUseCase {
  constructor(
    @inject('SolicitanteRepository')
    private solicitanteRepository: ISolicitanteRepository
  ) {}

  async execute({
    clienteId,
    departamentoId,
    nome,
    email,
    telefonesFixos,
    celular,
    gerenteDepartamento,
    gestorContrato,
    desabilitado
  }: IRequest): Promise<Solicitante> {
    const result = await this.solicitanteRepository.create({
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
      .then(solicitanteResult => {
        return solicitanteResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateSolicitanteUseCase }
