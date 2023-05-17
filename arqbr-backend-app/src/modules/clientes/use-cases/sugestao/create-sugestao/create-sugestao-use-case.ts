import { inject, injectable } from 'tsyringe'
import { Sugestao } from '@modules/clientes/infra/typeorm/entities/sugestao'
import { ISugestaoRepository } from '@modules/clientes/repositories/i-sugestao-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  clienteId: string
  departamentoId: string
  solicitanteId: string
  titulo: string
  descricao: string
  atendido: boolean
}

@injectable()
class CreateSugestaoUseCase {
  constructor(
    @inject('SugestaoRepository')
    private sugestaoRepository: ISugestaoRepository
  ) {}

  async execute({
    clienteId,
    departamentoId,
    solicitanteId,
    titulo,
    descricao,
    atendido
  }: IRequest): Promise<Sugestao> {
    const result = await this.sugestaoRepository.create({
        clienteId,
        departamentoId,
        solicitanteId,
        titulo,
        descricao,
        atendido
      })
      .then(sugestaoResult => {
        return sugestaoResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateSugestaoUseCase }
