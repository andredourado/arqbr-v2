import { inject, injectable } from 'tsyringe'
import { Escala } from '@modules/pessoas/infra/typeorm/entities/escala'
import { IEscalaRepository } from '@modules/pessoas/repositories/i-escala-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeleteEscalaUseCase {
  constructor(
    @inject('EscalaRepository')
    private escalaRepository: IEscalaRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const escala = await this.escalaRepository.delete(id)

    return escala
  }
}

export { DeleteEscalaUseCase }
