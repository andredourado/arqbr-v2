import { inject, injectable } from 'tsyringe'
import { IRastreamentoDocumentoRepository } from '@modules/classificacao/repositories/i-rastreamento-documento-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteRastreamentoDocumentoUseCase {
  constructor(
    @inject('RastreamentoDocumentoRepository')
    private rastreamentoDocumentoRepository: IRastreamentoDocumentoRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const rastreamentoDocumento = await this.rastreamentoDocumentoRepository.multiDelete(ids)

    return rastreamentoDocumento
  }
}

export { MultiDeleteRastreamentoDocumentoUseCase }
