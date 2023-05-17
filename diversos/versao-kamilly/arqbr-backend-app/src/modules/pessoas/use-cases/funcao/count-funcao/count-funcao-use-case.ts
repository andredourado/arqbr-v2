import { inject, injectable } from 'tsyringe'
import { Funcao } from '@modules/pessoas/infra/typeorm/entities/funcao'
import { IFuncaoRepository } from '@modules/pessoas/repositories/i-funcao-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
}

@injectable()
class CountFuncaoUseCase {
  constructor(
    @inject('FuncaoRepository')
    private funcaoRepository: IFuncaoRepository
  ) {}

  async execute({
    search
  }: IRequest): Promise<HttpResponse> {
    const funcoesCount = await this.funcaoRepository.count(
      search
    )

    return funcoesCount
  }
}

export { CountFuncaoUseCase }
