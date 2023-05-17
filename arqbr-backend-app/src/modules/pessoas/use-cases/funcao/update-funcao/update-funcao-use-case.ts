import { inject, injectable } from 'tsyringe'
import { Funcao } from '@modules/pessoas/infra/typeorm/entities/funcao'
import { IFuncaoRepository } from '@modules/pessoas/repositories/i-funcao-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  descricao: string
  desabilitado: boolean
}

@injectable()
class UpdateFuncaoUseCase {
  constructor(
    @inject('FuncaoRepository')
    private funcaoRepository: IFuncaoRepository
  ) {}

  async execute({
    id,
    descricao,
    desabilitado
  }: IRequest): Promise<HttpResponse> {
    const funcao = await this.funcaoRepository.update({
      id,
      descricao,
      desabilitado
    })

    return funcao
  }
}

export { UpdateFuncaoUseCase }
