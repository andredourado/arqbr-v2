import { inject, injectable } from 'tsyringe'
import { IDocumentoDigitalCampoRepository } from '@modules/digitalizacao/repositories/i-documento-digital-campo-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteDocumentoDigitalCampoUseCase {
  constructor(
    @inject('DocumentoDigitalCampoRepository')
    private documentoDigitalCampoRepository: IDocumentoDigitalCampoRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const documentoDigitalCampo = await this.documentoDigitalCampoRepository.multiDelete(ids)

    return documentoDigitalCampo
  }
}

export { MultiDeleteDocumentoDigitalCampoUseCase }
