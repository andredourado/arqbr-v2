import { inject, injectable } from 'tsyringe'
import { UnidadeSla } from '@modules/comum/infra/typeorm/entities/unidade-sla'
import { IUnidadeSlaRepository } from '@modules/comum/repositories/i-unidade-sla-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
}

@injectable()
class CountUnidadeSlaUseCase {
  constructor(
    @inject('UnidadeSlaRepository')
    private unidadeSlaRepository: IUnidadeSlaRepository
  ) {}

  async execute({
    search
  }: IRequest): Promise<HttpResponse> {
    const unidadesSlaCount = await this.unidadeSlaRepository.count(
      search
    )

    return unidadesSlaCount
  }
}

export { CountUnidadeSlaUseCase }
