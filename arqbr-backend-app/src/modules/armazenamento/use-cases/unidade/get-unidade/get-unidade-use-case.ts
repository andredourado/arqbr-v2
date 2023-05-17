import { inject, injectable } from 'tsyringe'
import { Unidade } from '@modules/armazenamento/infra/typeorm/entities/unidade'
import { IUnidadeRepository } from '@modules/armazenamento/repositories/i-unidade-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetUnidadeUseCase {
  constructor(
    @inject('UnidadeRepository')
    private unidadeRepository: IUnidadeRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const unidade = await this.unidadeRepository.get(id)

    return unidade
  }
}

export { GetUnidadeUseCase }
