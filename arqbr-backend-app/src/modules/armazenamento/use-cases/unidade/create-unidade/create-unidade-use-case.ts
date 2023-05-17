import { inject, injectable } from 'tsyringe'
import { Unidade } from '@modules/armazenamento/infra/typeorm/entities/unidade'
import { IUnidadeRepository } from '@modules/armazenamento/repositories/i-unidade-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  estadoId: string
  cidadeId: string
  nome: string
  endereco: string
  numero: string
  complemento: string
  cep: string
  desabilitado: boolean
}

@injectable()
class CreateUnidadeUseCase {
  constructor(
    @inject('UnidadeRepository')
    private unidadeRepository: IUnidadeRepository
  ) {}

  async execute({
    estadoId,
    cidadeId,
    nome,
    endereco,
    numero,
    complemento,
    cep,
    desabilitado
  }: IRequest): Promise<Unidade> {
    const result = await this.unidadeRepository.create({
        estadoId,
        cidadeId,
        nome,
        endereco,
        numero,
        complemento,
        cep,
        desabilitado
      })
      .then(unidadeResult => {
        return unidadeResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateUnidadeUseCase }
