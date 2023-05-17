import { inject, injectable } from 'tsyringe'
import { Planta } from '@modules/armazenamento/infra/typeorm/entities/planta'
import { IPlantaRepository } from '@modules/armazenamento/repositories/i-planta-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  unidadeId: string
  nome: string
  quantidadePosicoes: number
  desabilitado: boolean
}

@injectable()
class UpdatePlantaUseCase {
  constructor(
    @inject('PlantaRepository')
    private plantaRepository: IPlantaRepository
  ) {}

  async execute({
    id,
    unidadeId,
    nome,
    quantidadePosicoes,
    desabilitado
  }: IRequest): Promise<HttpResponse> {
    const planta = await this.plantaRepository.update({
      id,
      unidadeId,
      nome,
      quantidadePosicoes,
      desabilitado
    })

    return planta
  }
}

export { UpdatePlantaUseCase }
