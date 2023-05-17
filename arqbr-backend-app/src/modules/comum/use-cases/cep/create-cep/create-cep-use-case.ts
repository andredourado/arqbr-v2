import { inject, injectable } from 'tsyringe'
import { Cep } from '@modules/comum/infra/typeorm/entities/cep'
import { ICepRepository } from '@modules/comum/repositories/i-cep-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  codigoCep: string
  logradouro: string
  estadoId: string
  cidadeId: string
  bairro: string
}

@injectable()
class CreateCepUseCase {
  constructor(
    @inject('CepRepository')
    private cepRepository: ICepRepository
  ) {}

  async execute({
    codigoCep,
    logradouro,
    estadoId,
    cidadeId,
    bairro
  }: IRequest): Promise<Cep> {
    const result = await this.cepRepository.create({
        codigoCep,
        logradouro,
        estadoId,
        cidadeId,
        bairro
      })
      .then(cepResult => {
        return cepResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateCepUseCase }
