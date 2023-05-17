import { inject, injectable } from 'tsyringe'
import { Servico } from '@modules/comum/infra/typeorm/entities/servico'
import { IServicoRepository } from '@modules/comum/repositories/i-servico-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetServicoUseCase {
  constructor(
    @inject('ServicoRepository')
    private servicoRepository: IServicoRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const servico = await this.servicoRepository.get(id)

    return servico
  }
}

export { GetServicoUseCase }
