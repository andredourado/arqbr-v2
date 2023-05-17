import { inject, injectable } from 'tsyringe'
import { UnidadeSla } from '@modules/comum/infra/typeorm/entities/unidade-sla'
import { IUnidadeSlaRepository } from '@modules/comum/repositories/i-unidade-sla-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  descricao: string
  desabilitado: boolean
}

@injectable()
class CreateUnidadeSlaUseCase {
  constructor(
    @inject('UnidadeSlaRepository')
    private unidadeSlaRepository: IUnidadeSlaRepository
  ) {}

  async execute({
    descricao,
    desabilitado
  }: IRequest): Promise<UnidadeSla> {
    const result = await this.unidadeSlaRepository.create({
        descricao,
        desabilitado
      })
      .then(unidadeSlaResult => {
        return unidadeSlaResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateUnidadeSlaUseCase }
