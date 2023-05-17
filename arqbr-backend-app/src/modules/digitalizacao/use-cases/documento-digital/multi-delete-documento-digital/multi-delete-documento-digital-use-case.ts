import { inject, injectable } from 'tsyringe'
import { IDocumentoDigitalRepository } from '@modules/digitalizacao/repositories/i-documento-digital-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteDocumentoDigitalUseCase {
  constructor(
    @inject('DocumentoDigitalRepository')
    private documentoDigitalRepository: IDocumentoDigitalRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const documentoDigital = await this.documentoDigitalRepository.multiDelete(ids)

    return documentoDigital
  }
}

export { MultiDeleteDocumentoDigitalUseCase }
