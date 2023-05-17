import { inject, injectable } from 'tsyringe'
import { Funcao } from '@modules/pessoas/infra/typeorm/entities/funcao'
import { IFuncaoRepository } from '@modules/pessoas/repositories/i-funcao-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeleteFuncaoUseCase {
  constructor(
    @inject('FuncaoRepository')
    private funcaoRepository: IFuncaoRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const funcao = await this.funcaoRepository.delete(id)

    return funcao
  }
}

export { DeleteFuncaoUseCase }
