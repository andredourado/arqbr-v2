import { inject, injectable } from 'tsyringe'
import { IDocumentoRepository } from '@modules/classificacao/repositories/i-documento-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteDocumentoUseCase {
  constructor(
    @inject('DocumentoRepository')
    private documentoRepository: IDocumentoRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const documento = await this.documentoRepository.multiDelete(ids)

    return documento
  }
}

export { MultiDeleteDocumentoUseCase }
