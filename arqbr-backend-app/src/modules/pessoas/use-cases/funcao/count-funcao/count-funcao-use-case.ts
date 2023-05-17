import { inject, injectable } from 'tsyringe'
import { Funcao } from '@modules/pessoas/infra/typeorm/entities/funcao'
import { IFuncaoRepository } from '@modules/pessoas/repositories/i-funcao-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountFuncaoUseCase {
  constructor(
    @inject('FuncaoRepository')
    private funcaoRepository: IFuncaoRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const funcoesCount = await this.funcaoRepository.count(
      search,
      filter
    )

    return funcoesCount
  }
}

export { CountFuncaoUseCase }
