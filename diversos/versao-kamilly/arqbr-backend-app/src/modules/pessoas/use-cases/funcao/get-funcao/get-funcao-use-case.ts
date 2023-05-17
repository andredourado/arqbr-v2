import { inject, injectable } from 'tsyringe'
import { Funcao } from '@modules/pessoas/infra/typeorm/entities/funcao'
import { IFuncaoRepository } from '@modules/pessoas/repositories/i-funcao-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetFuncaoUseCase {
  constructor(
    @inject('FuncaoRepository')
    private funcaoRepository: IFuncaoRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const funcao = await this.funcaoRepository.get(id)

    return funcao
  }
}

export { GetFuncaoUseCase }
