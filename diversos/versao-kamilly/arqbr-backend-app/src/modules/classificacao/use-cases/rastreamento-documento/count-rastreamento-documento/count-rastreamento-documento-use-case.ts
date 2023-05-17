import { inject, injectable } from 'tsyringe'
import { RastreamentoDocumento } from '@modules/classificacao/infra/typeorm/entities/rastreamento-documento'
import { IRastreamentoDocumentoRepository } from '@modules/classificacao/repositories/i-rastreamento-documento-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
}

@injectable()
class CountRastreamentoDocumentoUseCase {
  constructor(
    @inject('RastreamentoDocumentoRepository')
    private rastreamentoDocumentoRepository: IRastreamentoDocumentoRepository
  ) {}

  async execute({
    search
  }: IRequest): Promise<HttpResponse> {
    const rastreamentoDocumentosCount = await this.rastreamentoDocumentoRepository.count(
      search
    )

    return rastreamentoDocumentosCount
  }
}

export { CountRastreamentoDocumentoUseCase }
