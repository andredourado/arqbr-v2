import { inject, injectable } from 'tsyringe'
import { Estado } from '@modules/comum/infra/typeorm/entities/estado'
import { IEstadoRepository } from '@modules/comum/repositories/i-estado-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  nomeEstado: string
  uf: string
  codigoIbge: string
}

@injectable()
class UpdateEstadoUseCase {
  constructor(
    @inject('EstadoRepository')
    private estadoRepository: IEstadoRepository
  ) {}

  async execute({
    id,
    nomeEstado,
    uf,
    codigoIbge
  }: IRequest): Promise<HttpResponse> {
    const estado = await this.estadoRepository.update({
      id,
      nomeEstado,
      uf,
      codigoIbge
    })

    return estado
  }
}

export { UpdateEstadoUseCase }
