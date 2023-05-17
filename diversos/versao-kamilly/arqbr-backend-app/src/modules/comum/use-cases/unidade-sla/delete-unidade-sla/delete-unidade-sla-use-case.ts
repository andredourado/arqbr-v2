import { inject, injectable } from 'tsyringe'
import { UnidadeSla } from '@modules/comum/infra/typeorm/entities/unidade-sla'
import { IUnidadeSlaRepository } from '@modules/comum/repositories/i-unidade-sla-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeleteUnidadeSlaUseCase {
  constructor(
    @inject('UnidadeSlaRepository')
    private unidadeSlaRepository: IUnidadeSlaRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const unidadeSla = await this.unidadeSlaRepository.delete(id)

    return unidadeSla
  }
}

export { DeleteUnidadeSlaUseCase }
