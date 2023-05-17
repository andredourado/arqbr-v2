import { inject, injectable } from 'tsyringe'
import { Servico } from '@modules/comum/infra/typeorm/entities/servico'
import { IServicoRepository } from '@modules/comum/repositories/i-servico-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
}

@injectable()
class CountServicoUseCase {
  constructor(
    @inject('ServicoRepository')
    private servicoRepository: IServicoRepository
  ) {}

  async execute({
    search
  }: IRequest): Promise<HttpResponse> {
    const servicosCount = await this.servicoRepository.count(
      search
    )

    return servicosCount
  }
}

export { CountServicoUseCase }
