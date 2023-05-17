import { inject, injectable } from 'tsyringe'
import { Afastamento } from '@modules/pessoas/infra/typeorm/entities/afastamento'
import { IAfastamentoRepository } from '@modules/pessoas/repositories/i-afastamento-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
}

@injectable()
class CountAfastamentoUseCase {
  constructor(
    @inject('AfastamentoRepository')
    private afastamentoRepository: IAfastamentoRepository
  ) {}

  async execute({
    search
  }: IRequest): Promise<HttpResponse> {
    const afastamentosCount = await this.afastamentoRepository.count(
      search
    )

    return afastamentosCount
  }
}

export { CountAfastamentoUseCase }
