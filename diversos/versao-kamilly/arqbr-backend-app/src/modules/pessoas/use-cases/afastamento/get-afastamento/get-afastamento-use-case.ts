import { inject, injectable } from 'tsyringe'
import { Afastamento } from '@modules/pessoas/infra/typeorm/entities/afastamento'
import { IAfastamentoRepository } from '@modules/pessoas/repositories/i-afastamento-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetAfastamentoUseCase {
  constructor(
    @inject('AfastamentoRepository')
    private afastamentoRepository: IAfastamentoRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const afastamento = await this.afastamentoRepository.get(id)

    return afastamento
  }
}

export { GetAfastamentoUseCase }
