import { inject, injectable } from 'tsyringe'
import { Servico } from '@modules/comum/infra/typeorm/entities/servico'
import { IServicoRepository } from '@modules/comum/repositories/i-servico-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  descricao: string
  desabilitado: boolean
}

@injectable()
class UpdateServicoUseCase {
  constructor(
    @inject('ServicoRepository')
    private servicoRepository: IServicoRepository
  ) {}

  async execute({
    id,
    descricao,
    desabilitado
  }: IRequest): Promise<HttpResponse> {
    const servico = await this.servicoRepository.update({
      id,
      descricao,
      desabilitado
    })

    return servico
  }
}

export { UpdateServicoUseCase }
