import { inject, injectable } from 'tsyringe'
import { RastreamentoDocumento } from '@modules/classificacao/infra/typeorm/entities/rastreamento-documento'
import { IRastreamentoDocumentoRepository } from '@modules/classificacao/repositories/i-rastreamento-documento-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetRastreamentoDocumentoUseCase {
  constructor(
    @inject('RastreamentoDocumentoRepository')
    private rastreamentoDocumentoRepository: IRastreamentoDocumentoRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const rastreamentoDocumento = await this.rastreamentoDocumentoRepository.get(id)

    return rastreamentoDocumento
  }
}

export { GetRastreamentoDocumentoUseCase }
