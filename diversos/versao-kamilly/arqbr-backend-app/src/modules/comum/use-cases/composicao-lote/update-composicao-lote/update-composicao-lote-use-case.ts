import { inject, injectable } from 'tsyringe'
import { ComposicaoLote } from '@modules/comum/infra/typeorm/entities/composicao-lote'
import { IComposicaoLoteRepository } from '@modules/comum/repositories/i-composicao-lote-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  descricao: string
  desabilitado: boolean
}

@injectable()
class UpdateComposicaoLoteUseCase {
  constructor(
    @inject('ComposicaoLoteRepository')
    private composicaoLoteRepository: IComposicaoLoteRepository
  ) {}

  async execute({
    id,
    descricao,
    desabilitado
  }: IRequest): Promise<HttpResponse> {
    const composicaoLote = await this.composicaoLoteRepository.update({
      id,
      descricao,
      desabilitado
    })

    return composicaoLote
  }
}

export { UpdateComposicaoLoteUseCase }
