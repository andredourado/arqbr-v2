import { inject, injectable } from 'tsyringe'
import { Afastamento } from '@modules/pessoas/infra/typeorm/entities/afastamento'
import { IAfastamentoRepository } from '@modules/pessoas/repositories/i-afastamento-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  pessoaId: string
  tipoAfastamentoId: string
  inicio: Date
  fim: Date
  desabilitado: boolean
}

@injectable()
class UpdateAfastamentoUseCase {
  constructor(
    @inject('AfastamentoRepository')
    private afastamentoRepository: IAfastamentoRepository
  ) {}

  async execute({
    id,
    pessoaId,
    tipoAfastamentoId,
    inicio,
    fim,
    desabilitado
  }: IRequest): Promise<HttpResponse> {
    const afastamento = await this.afastamentoRepository.update({
      id,
      pessoaId,
      tipoAfastamentoId,
      inicio,
      fim,
      desabilitado
    })

    return afastamento
  }
}

export { UpdateAfastamentoUseCase }
