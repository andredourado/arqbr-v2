import { inject, injectable } from 'tsyringe'
import { Coleta } from '@modules/coleta/infra/typeorm/entities/coleta'
import { IColetaRepository } from '@modules/coleta/repositories/i-coleta-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeleteColetaUseCase {
  constructor(
    @inject('ColetaRepository')
    private coletaRepository: IColetaRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const coleta = await this.coletaRepository.delete(id)

    return coleta
  }
}

export { DeleteColetaUseCase }
