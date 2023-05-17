import { inject, injectable } from 'tsyringe'
import { Sugestao } from '@modules/clientes/infra/typeorm/entities/sugestao'
import { ISugestaoRepository } from '@modules/clientes/repositories/i-sugestao-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  clienteId: string
  departamentoId: string
  solicitanteId: string
  titulo: string
  descricao: string
  atendido: boolean
}

@injectable()
class UpdateSugestaoUseCase {
  constructor(
    @inject('SugestaoRepository')
    private sugestaoRepository: ISugestaoRepository
  ) {}

  async execute({
    id,
    clienteId,
    departamentoId,
    solicitanteId,
    titulo,
    descricao,
    atendido
  }: IRequest): Promise<HttpResponse> {
    const sugestao = await this.sugestaoRepository.update({
      id,
      clienteId,
      departamentoId,
      solicitanteId,
      titulo,
      descricao,
      atendido
    })

    return sugestao
  }
}

export { UpdateSugestaoUseCase }
