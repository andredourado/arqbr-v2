import { inject, injectable } from 'tsyringe'
import { UnidadeSla } from '@modules/comum/infra/typeorm/entities/unidade-sla'
import { IUnidadeSlaRepository } from '@modules/comum/repositories/i-unidade-sla-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  descricao: string
  desabilitado: boolean
}

@injectable()
class UpdateUnidadeSlaUseCase {
  constructor(
    @inject('UnidadeSlaRepository')
    private unidadeSlaRepository: IUnidadeSlaRepository
  ) {}

  async execute({
    id,
    descricao,
    desabilitado
  }: IRequest): Promise<HttpResponse> {
    const unidadeSla = await this.unidadeSlaRepository.update({
      id,
      descricao,
      desabilitado
    })

    return unidadeSla
  }
}

export { UpdateUnidadeSlaUseCase }
