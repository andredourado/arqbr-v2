import { inject, injectable } from 'tsyringe'
import { Estado } from '@modules/comum/infra/typeorm/entities/estado'
import { IEstadoRepository } from '@modules/comum/repositories/i-estado-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  nomeEstado: string
  uf: string
  codigoIbge: string
}

@injectable()
class CreateEstadoUseCase {
  constructor(
    @inject('EstadoRepository')
    private estadoRepository: IEstadoRepository
  ) {}

  async execute({
    nomeEstado,
    uf,
    codigoIbge
  }: IRequest): Promise<Estado> {
    const result = await this.estadoRepository.create({
        nomeEstado,
        uf,
        codigoIbge
      })
      .then(estadoResult => {
        return estadoResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateEstadoUseCase }
