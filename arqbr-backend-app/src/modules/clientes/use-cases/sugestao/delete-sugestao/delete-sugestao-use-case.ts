import { inject, injectable } from 'tsyringe'
import { Sugestao } from '@modules/clientes/infra/typeorm/entities/sugestao'
import { ISugestaoRepository } from '@modules/clientes/repositories/i-sugestao-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeleteSugestaoUseCase {
  constructor(
    @inject('SugestaoRepository')
    private sugestaoRepository: ISugestaoRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const sugestao = await this.sugestaoRepository.delete(id)

    return sugestao
  }
}

export { DeleteSugestaoUseCase }
