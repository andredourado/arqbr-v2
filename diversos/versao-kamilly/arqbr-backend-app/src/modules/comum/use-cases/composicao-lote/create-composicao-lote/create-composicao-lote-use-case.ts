import { inject, injectable } from 'tsyringe'
import { ComposicaoLote } from '@modules/comum/infra/typeorm/entities/composicao-lote'
import { IComposicaoLoteRepository } from '@modules/comum/repositories/i-composicao-lote-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  descricao: string
  desabilitado: boolean
}

@injectable()
class CreateComposicaoLoteUseCase {
  constructor(
    @inject('ComposicaoLoteRepository')
    private composicaoLoteRepository: IComposicaoLoteRepository
  ) {}

  async execute({
    descricao,
    desabilitado
  }: IRequest): Promise<ComposicaoLote> {
    const result = await this.composicaoLoteRepository.create({
        descricao,
        desabilitado
      })
      .then(composicaoLoteResult => {
        return composicaoLoteResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateComposicaoLoteUseCase }
