import { inject, injectable } from 'tsyringe'
import { CaixaQuebra } from '@modules/digitalizacao/infra/typeorm/entities/caixa-quebra'
import { ICaixaQuebraRepository } from '@modules/digitalizacao/repositories/i-caixa-quebra-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetCaixaQuebraUseCase {
  constructor(
    @inject('CaixaQuebraRepository')
    private caixaQuebraRepository: ICaixaQuebraRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const caixaQuebra = await this.caixaQuebraRepository.get(id)

    return caixaQuebra
  }
}

export { GetCaixaQuebraUseCase }
