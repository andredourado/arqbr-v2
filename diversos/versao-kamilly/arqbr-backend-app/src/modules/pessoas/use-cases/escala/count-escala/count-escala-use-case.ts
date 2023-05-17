import { inject, injectable } from 'tsyringe'
import { Escala } from '@modules/pessoas/infra/typeorm/entities/escala'
import { IEscalaRepository } from '@modules/pessoas/repositories/i-escala-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
}

@injectable()
class CountEscalaUseCase {
  constructor(
    @inject('EscalaRepository')
    private escalaRepository: IEscalaRepository
  ) {}

  async execute({
    search
  }: IRequest): Promise<HttpResponse> {
    const escalasCount = await this.escalaRepository.count(
      search
    )

    return escalasCount
  }
}

export { CountEscalaUseCase }
