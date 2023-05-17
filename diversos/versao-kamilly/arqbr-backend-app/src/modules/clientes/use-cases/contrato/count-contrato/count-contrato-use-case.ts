import { inject, injectable } from 'tsyringe'
import { Contrato } from '@modules/clientes/infra/typeorm/entities/contrato'
import { IContratoRepository } from '@modules/clientes/repositories/i-contrato-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
}

@injectable()
class CountContratoUseCase {
  constructor(
    @inject('ContratoRepository')
    private contratoRepository: IContratoRepository
  ) {}

  async execute({
    search
  }: IRequest): Promise<HttpResponse> {
    const contratosCount = await this.contratoRepository.count(
      search
    )

    return contratosCount
  }
}

export { CountContratoUseCase }
