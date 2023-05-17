import { inject, injectable } from 'tsyringe'
import { Planta } from '@modules/armazenamento/infra/typeorm/entities/planta'
import { IPlantaRepository } from '@modules/armazenamento/repositories/i-planta-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  unidadeId: string
  nome: string
  quantidadePosicoes: number
  desabilitado: boolean
}

@injectable()
class CreatePlantaUseCase {
  constructor(
    @inject('PlantaRepository')
    private plantaRepository: IPlantaRepository
  ) {}

  async execute({
    unidadeId,
    nome,
    quantidadePosicoes,
    desabilitado
  }: IRequest): Promise<Planta> {
    const result = await this.plantaRepository.create({
        unidadeId,
        nome,
        quantidadePosicoes,
        desabilitado
      })
      .then(plantaResult => {
        return plantaResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreatePlantaUseCase }
