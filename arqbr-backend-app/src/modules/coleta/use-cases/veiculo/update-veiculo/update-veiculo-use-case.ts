import { inject, injectable } from 'tsyringe'
import { Veiculo } from '@modules/coleta/infra/typeorm/entities/veiculo'
import { IVeiculoRepository } from '@modules/coleta/repositories/i-veiculo-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  descricao: string
  desabilitado: boolean
}

@injectable()
class UpdateVeiculoUseCase {
  constructor(
    @inject('VeiculoRepository')
    private veiculoRepository: IVeiculoRepository
  ) {}

  async execute({
    id,
    descricao,
    desabilitado
  }: IRequest): Promise<HttpResponse> {
    const veiculo = await this.veiculoRepository.update({
      id,
      descricao,
      desabilitado
    })

    return veiculo
  }
}

export { UpdateVeiculoUseCase }
