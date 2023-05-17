import { inject, injectable } from 'tsyringe'
import { Contrato } from '@modules/clientes/infra/typeorm/entities/contrato'
import { IContratoRepository } from '@modules/clientes/repositories/i-contrato-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  clienteId: string
  identificador: string
  aceitaServicosTerceiros: boolean
  desabilitado: boolean
}

@injectable()
class UpdateContratoUseCase {
  constructor(
    @inject('ContratoRepository')
    private contratoRepository: IContratoRepository
  ) {}

  async execute({
    id,
    clienteId,
    identificador,
    aceitaServicosTerceiros,
    desabilitado
  }: IRequest): Promise<HttpResponse> {
    const contrato = await this.contratoRepository.update({
      id,
      clienteId,
      identificador,
      aceitaServicosTerceiros,
      desabilitado
    })

    return contrato
  }
}

export { UpdateContratoUseCase }
