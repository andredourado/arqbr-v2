import { inject, injectable } from 'tsyringe'
import { IFuncaoRepository } from '@modules/pessoas/repositories/i-funcao-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteFuncaoUseCase {
  constructor(
    @inject('FuncaoRepository')
    private funcaoRepository: IFuncaoRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const funcao = await this.funcaoRepository.multiDelete(ids)

    return funcao
  }
}

export { MultiDeleteFuncaoUseCase }
