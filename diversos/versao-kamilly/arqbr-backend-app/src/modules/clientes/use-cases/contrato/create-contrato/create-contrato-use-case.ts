import { inject, injectable } from 'tsyringe'
import { Contrato } from '@modules/clientes/infra/typeorm/entities/contrato'
import { IContratoRepository } from '@modules/clientes/repositories/i-contrato-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  clienteId: string
  identificador: string
  aceitaServicosTerceiros: boolean
  desabilitado: boolean
}

@injectable()
class CreateContratoUseCase {
  constructor(
    @inject('ContratoRepository')
    private contratoRepository: IContratoRepository
  ) {}

  async execute({
    clienteId,
    identificador,
    aceitaServicosTerceiros,
    desabilitado
  }: IRequest): Promise<Contrato> {
    const result = await this.contratoRepository.create({
        clienteId,
        identificador,
        aceitaServicosTerceiros,
        desabilitado
      })
      .then(contratoResult => {
        return contratoResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateContratoUseCase }
