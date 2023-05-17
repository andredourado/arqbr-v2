import { inject, injectable } from "tsyringe"
import { IFuncaoRepository } from '@modules/pessoas/repositories/i-funcao-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectFuncaoUseCase {
  constructor(
    @inject('FuncaoRepository')
    private funcaoRepository: IFuncaoRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const funcao = await this.funcaoRepository.idSelect(id)

    return funcao
  }
}

export { IdSelectFuncaoUseCase }
