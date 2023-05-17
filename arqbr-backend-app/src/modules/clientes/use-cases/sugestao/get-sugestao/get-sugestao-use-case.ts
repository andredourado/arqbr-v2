import { inject, injectable } from 'tsyringe'
import { Sugestao } from '@modules/clientes/infra/typeorm/entities/sugestao'
import { ISugestaoRepository } from '@modules/clientes/repositories/i-sugestao-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetSugestaoUseCase {
  constructor(
    @inject('SugestaoRepository')
    private sugestaoRepository: ISugestaoRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const sugestao = await this.sugestaoRepository.get(id)

    return sugestao
  }
}

export { GetSugestaoUseCase }
