import { inject, injectable } from 'tsyringe'
import { TipoAfastamento } from '@modules/comum/infra/typeorm/entities/tipo-afastamento'
import { ITipoAfastamentoRepository } from '@modules/comum/repositories/i-tipo-afastamento-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  descricao: string
  desabilitado: boolean
}

@injectable()
class UpdateTipoAfastamentoUseCase {
  constructor(
    @inject('TipoAfastamentoRepository')
    private tipoAfastamentoRepository: ITipoAfastamentoRepository
  ) {}

  async execute({
    id,
    descricao,
    desabilitado
  }: IRequest): Promise<HttpResponse> {
    const tipoAfastamento = await this.tipoAfastamentoRepository.update({
      id,
      descricao,
      desabilitado
    })

    return tipoAfastamento
  }
}

export { UpdateTipoAfastamentoUseCase }
