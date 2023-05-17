import { inject, injectable } from 'tsyringe'
import { Unidade } from '@modules/armazenamento/infra/typeorm/entities/unidade'
import { IUnidadeRepository } from '@modules/armazenamento/repositories/i-unidade-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeleteUnidadeUseCase {
  constructor(
    @inject('UnidadeRepository')
    private unidadeRepository: IUnidadeRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const unidade = await this.unidadeRepository.delete(id)

    return unidade
  }
}

export { DeleteUnidadeUseCase }
