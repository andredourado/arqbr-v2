import { inject, injectable } from 'tsyringe'
import { TipoAfastamento } from '@modules/comum/infra/typeorm/entities/tipo-afastamento'
import { ITipoAfastamentoRepository } from '@modules/comum/repositories/i-tipo-afastamento-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  descricao: string
  desabilitado: boolean
}

@injectable()
class CreateTipoAfastamentoUseCase {
  constructor(
    @inject('TipoAfastamentoRepository')
    private tipoAfastamentoRepository: ITipoAfastamentoRepository
  ) {}

  async execute({
    descricao,
    desabilitado
  }: IRequest): Promise<TipoAfastamento> {
    const result = await this.tipoAfastamentoRepository.create({
        descricao,
        desabilitado
      })
      .then(tipoAfastamentoResult => {
        return tipoAfastamentoResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateTipoAfastamentoUseCase }
