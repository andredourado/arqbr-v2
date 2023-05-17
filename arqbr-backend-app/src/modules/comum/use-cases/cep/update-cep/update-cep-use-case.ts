import { inject, injectable } from 'tsyringe'
import { Cep } from '@modules/comum/infra/typeorm/entities/cep'
import { ICepRepository } from '@modules/comum/repositories/i-cep-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  codigoCep: string
  logradouro: string
  estadoId: string
  cidadeId: string
  bairro: string
}

@injectable()
class UpdateCepUseCase {
  constructor(
    @inject('CepRepository')
    private cepRepository: ICepRepository
  ) {}

  async execute({
    id,
    codigoCep,
    logradouro,
    estadoId,
    cidadeId,
    bairro
  }: IRequest): Promise<HttpResponse> {
    const cep = await this.cepRepository.update({
      id,
      codigoCep,
      logradouro,
      estadoId,
      cidadeId,
      bairro
    })

    return cep
  }
}

export { UpdateCepUseCase }
