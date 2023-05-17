import { inject, injectable } from 'tsyringe'
import { IVersaoDocumentoRepository } from '@modules/digitalizacao/repositories/i-versao-documento-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteVersaoDocumentoUseCase {
  constructor(
    @inject('VersaoDocumentoRepository')
    private versaoDocumentoRepository: IVersaoDocumentoRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const versaoDocumento = await this.versaoDocumentoRepository.multiDelete(ids)

    return versaoDocumento
  }
}

export { MultiDeleteVersaoDocumentoUseCase }
