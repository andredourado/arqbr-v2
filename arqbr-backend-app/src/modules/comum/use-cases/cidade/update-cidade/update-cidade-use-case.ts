import { inject, injectable } from 'tsyringe'
import { Cidade } from '@modules/comum/infra/typeorm/entities/cidade'
import { ICidadeRepository } from '@modules/comum/repositories/i-cidade-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  estadoId: string
  nomeCidade: string
  codigoIbge: string
}

@injectable()
class UpdateCidadeUseCase {
  constructor(
    @inject('CidadeRepository')
    private cidadeRepository: ICidadeRepository
  ) {}

  async execute({
    id,
    estadoId,
    nomeCidade,
    codigoIbge
  }: IRequest): Promise<HttpResponse> {
    const cidade = await this.cidadeRepository.update({
      id,
      estadoId,
      nomeCidade,
      codigoIbge
    })

    return cidade
  }
}

export { UpdateCidadeUseCase }
