import { inject, injectable } from 'tsyringe'
import { ITipoDocumentoRepository } from '@modules/digitalizacao/repositories/i-tipo-documento-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteTipoDocumentoUseCase {
  constructor(
    @inject('TipoDocumentoRepository')
    private tipoDocumentoRepository: ITipoDocumentoRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const tipoDocumento = await this.tipoDocumentoRepository.multiDelete(ids)

    return tipoDocumento
  }
}

export { MultiDeleteTipoDocumentoUseCase }
