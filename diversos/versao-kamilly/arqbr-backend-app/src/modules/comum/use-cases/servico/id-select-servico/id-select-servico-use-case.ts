import { inject, injectable } from "tsyringe"
import { IServicoRepository } from '@modules/comum/repositories/i-servico-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectServicoUseCase {
  constructor(
    @inject('ServicoRepository')
    private servicoRepository: IServicoRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const servico = await this.servicoRepository.idSelect(id)

    return servico
  }
}

export { IdSelectServicoUseCase }
