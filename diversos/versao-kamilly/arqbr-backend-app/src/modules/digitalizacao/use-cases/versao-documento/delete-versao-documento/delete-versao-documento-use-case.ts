import { inject, injectable } from 'tsyringe'
import { VersaoDocumento } from '@modules/digitalizacao/infra/typeorm/entities/versao-documento'
import { IVersaoDocumentoRepository } from '@modules/digitalizacao/repositories/i-versao-documento-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeleteVersaoDocumentoUseCase {
  constructor(
    @inject('VersaoDocumentoRepository')
    private versaoDocumentoRepository: IVersaoDocumentoRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const versaoDocumento = await this.versaoDocumentoRepository.delete(id)

    return versaoDocumento
  }
}

export { DeleteVersaoDocumentoUseCase }
