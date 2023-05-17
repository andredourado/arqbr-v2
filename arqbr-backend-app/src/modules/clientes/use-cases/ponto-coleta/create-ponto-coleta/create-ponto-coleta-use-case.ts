import { inject, injectable } from 'tsyringe'
import { PontoColeta } from '@modules/clientes/infra/typeorm/entities/ponto-coleta'
import { IPontoColetaRepository } from '@modules/clientes/repositories/i-ponto-coleta-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  clienteId: string
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
class CreatePontoColetaUseCase {
  constructor(
    @inject('PontoColetaRepository')
    private pontoColetaRepository: IPontoColetaRepository
  ) {}

  async execute({
    clienteId,
    descricao,
    estadoId,
    cidadeId,
    endereco,
    numero,
    complemento,
    pessoaContatoNome,
    pessoaContatoCelular,
    desabilitado
  }: IRequest): Promise<PontoColeta> {
    const result = await this.pontoColetaRepository.create({
        clienteId,
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
      .then(pontoColetaResult => {
        return pontoColetaResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreatePontoColetaUseCase }
