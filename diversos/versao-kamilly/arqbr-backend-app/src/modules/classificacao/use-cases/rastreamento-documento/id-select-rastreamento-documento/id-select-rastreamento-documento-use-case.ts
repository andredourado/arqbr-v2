import { inject, injectable } from "tsyringe"
import { IRastreamentoDocumentoRepository } from '@modules/classificacao/repositories/i-rastreamento-documento-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectRastreamentoDocumentoUseCase {
  constructor(
    @inject('RastreamentoDocumentoRepository')
    private rastreamentoDocumentoRepository: IRastreamentoDocumentoRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const rastreamentoDocumento = await this.rastreamentoDocumentoRepository.idSelect(id)

    return rastreamentoDocumento
  }
}

export { IdSelectRastreamentoDocumentoUseCase }
