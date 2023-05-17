import { inject, injectable } from 'tsyringe'
import { Funcao } from '@modules/pessoas/infra/typeorm/entities/funcao'
import { IFuncaoRepository } from '@modules/pessoas/repositories/i-funcao-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  descricao: string
  metaProducao: number
  desabilitado: boolean
}

@injectable()
class CreateFuncaoUseCase {
  constructor(
    @inject('FuncaoRepository')
    private funcaoRepository: IFuncaoRepository
  ) {}

  async execute({
    descricao,
    metaProducao,
    desabilitado
  }: IRequest): Promise<Funcao> {
    const result = await this.funcaoRepository.create({
        descricao,
        metaProducao,
        desabilitado
      })
      .then(funcaoResult => {
        return funcaoResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateFuncaoUseCase }
