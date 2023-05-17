import { inject, injectable } from 'tsyringe'
import { Posicao } from '@modules/armazenamento/infra/typeorm/entities/posicao'
import { IPosicaoRepository } from '@modules/armazenamento/repositories/i-posicao-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
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
class CreatePosicaoUseCase {
  constructor(
    @inject('PosicaoRepository')
    private posicaoRepository: IPosicaoRepository
  ) {}

  async execute({
    unidadeId,
    plantaId,
    rua,
    linha,
    coluna,
    posicoes,
    posicoesDisponíveis,
    desabilitado
  }: IRequest): Promise<Posicao> {
    const result = await this.posicaoRepository.create({
        unidadeId,
        plantaId,
        rua,
        linha,
        coluna,
        posicoes,
        posicoesDisponíveis,
        desabilitado
      })
      .then(posicaoResult => {
        return posicaoResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreatePosicaoUseCase }
