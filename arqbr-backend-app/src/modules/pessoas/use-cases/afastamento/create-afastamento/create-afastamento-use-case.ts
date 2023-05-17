import { inject, injectable } from 'tsyringe'
import { Afastamento } from '@modules/pessoas/infra/typeorm/entities/afastamento'
import { IAfastamentoRepository } from '@modules/pessoas/repositories/i-afastamento-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  pessoaId: string
  tipoAfastamentoId: string
  inicio: Date
  fim: Date
  desabilitado: boolean
}

@injectable()
class CreateAfastamentoUseCase {
  constructor(
    @inject('AfastamentoRepository')
    private afastamentoRepository: IAfastamentoRepository
  ) {}

  async execute({
    pessoaId,
    tipoAfastamentoId,
    inicio,
    fim,
    desabilitado
  }: IRequest): Promise<Afastamento> {
    const result = await this.afastamentoRepository.create({
        pessoaId,
        tipoAfastamentoId,
        inicio,
        fim,
        desabilitado
      })
      .then(afastamentoResult => {
        return afastamentoResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateAfastamentoUseCase }
