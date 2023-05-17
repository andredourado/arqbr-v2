import { inject, injectable } from 'tsyringe'
import { ICampoDocumentoRepository } from '@modules/digitalizacao/repositories/i-campo-documento-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteCampoDocumentoUseCase {
  constructor(
    @inject('CampoDocumentoRepository')
    private campoDocumentoRepository: ICampoDocumentoRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const campoDocumento = await this.campoDocumentoRepository.multiDelete(ids)

    return campoDocumento
  }
}

export { MultiDeleteCampoDocumentoUseCase }
