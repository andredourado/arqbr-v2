import { inject, injectable } from 'tsyringe'
import { Estado } from '@modules/comum/infra/typeorm/entities/estado'
import { IEstadoRepository } from '@modules/comum/repositories/i-estado-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  uf: string
  nomeEstado: string
}

@injectable()
class CreateEstadoUseCase {
  constructor(
    @inject('EstadoRepository')
    private estadoRepository: IEstadoRepository
  ) {}

  async execute({
    uf,
    nomeEstado
  }: IRequest): Promise<Estado> {
    const result = await this.estadoRepository.create({
        uf,
        nomeEstado
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
