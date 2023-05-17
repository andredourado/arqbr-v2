import { inject, injectable } from 'tsyringe'
import { PontoColeta } from '@modules/clientes/infra/typeorm/entities/ponto-coleta'
import { IPontoColetaRepository } from '@modules/clientes/repositories/i-ponto-coleta-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  clienteId: string
  contratoId: string
  descricao: string
  estadoId: string
  cidadeId: string
  endereco: string
  numero: string
  complemento: string
  pessoaContatoNome: string
  pessoaContatoCelular: string
  desabilitado: boolean
}

@injectable()
class UpdatePontoColetaUseCase {
  constructor(
    @inject('PontoColetaRepository')
    private pontoColetaRepository: IPontoColetaRepository
  ) {}

  async execute({
    id,
    clienteId,
    contratoId,
    descricao,
    estadoId,
    cidadeId,
    endereco,
    numero,
    complemento,
    pessoaContatoNome,
    pessoaContatoCelular,
    desabilitado
  }: IRequest): Promise<HttpResponse> {
    const pontoColeta = await this.pontoColetaRepository.update({
      id,
      clienteId,
      contratoId,
      descricao,
      estadoId,
      cidadeId,
      endereco,
      numero,
      complemento,
      pessoaContatoNome,
      pessoaContatoCelular,
      desabilitado
    })

    return pontoColeta
  }
}

export { UpdatePontoColetaUseCase }
