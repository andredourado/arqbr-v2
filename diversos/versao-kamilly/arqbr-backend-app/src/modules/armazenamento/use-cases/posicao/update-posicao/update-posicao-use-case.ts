import { inject, injectable } from 'tsyringe'
import { Posicao } from '@modules/armazenamento/infra/typeorm/entities/posicao'
import { IPosicaoRepository } from '@modules/armazenamento/repositories/i-posicao-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  unidadeId: string
  plantaId: string
  rua: string
  linha: string
  coluna: string
  posicoes: number
  posicoesDisponíveis: number
  desabilitado: boolean
}

@injectable()
class UpdatePosicaoUseCase {
  constructor(
    @inject('PosicaoRepository')
    private posicaoRepository: IPosicaoRepository
  ) {}

  async execute({
    id,
    unidadeId,
    plantaId,
    rua,
    linha,
    coluna,
    posicoes,
    posicoesDisponíveis,
    desabilitado
  }: IRequest): Promise<HttpResponse> {
    const posicao = await this.posicaoRepository.update({
      id,
      unidadeId,
      plantaId,
      rua,
      linha,
      coluna,
      posicoes,
      posicoesDisponíveis,
      desabilitado
    })

    return posicao
  }
}

export { UpdatePosicaoUseCase }
