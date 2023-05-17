import { inject, injectable } from 'tsyringe'
import { Veiculo } from '@modules/coleta/infra/typeorm/entities/veiculo'
import { IVeiculoRepository } from '@modules/coleta/repositories/i-veiculo-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  descricao: string
  capacidade: number
  desabilitado: boolean
}

@injectable()
class CreateVeiculoUseCase {
  constructor(
    @inject('VeiculoRepository')
    private veiculoRepository: IVeiculoRepository
  ) {}

  async execute({
    descricao,
    capacidade,
    desabilitado
  }: IRequest): Promise<Veiculo> {
    const result = await this.veiculoRepository.create({
        descricao,
        capacidade,
        desabilitado
      })
      .then(veiculoResult => {
        return veiculoResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateVeiculoUseCase }
