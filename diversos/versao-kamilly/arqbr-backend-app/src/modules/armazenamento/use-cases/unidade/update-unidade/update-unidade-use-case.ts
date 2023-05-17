import { inject, injectable } from 'tsyringe'
import { Unidade } from '@modules/armazenamento/infra/typeorm/entities/unidade'
import { IUnidadeRepository } from '@modules/armazenamento/repositories/i-unidade-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
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
class UpdateUnidadeUseCase {
  constructor(
    @inject('UnidadeRepository')
    private unidadeRepository: IUnidadeRepository
  ) {}

  async execute({
    id,
    estadoId,
    cidadeId,
    nome,
    endereco,
    numero,
    complemento,
    cep,
    desabilitado
  }: IRequest): Promise<HttpResponse> {
    const unidade = await this.unidadeRepository.update({
      id,
      estadoId,
      cidadeId,
      nome,
      endereco,
      numero,
      complemento,
      cep,
      desabilitado
    })

    return unidade
  }
}

export { UpdateUnidadeUseCase }
