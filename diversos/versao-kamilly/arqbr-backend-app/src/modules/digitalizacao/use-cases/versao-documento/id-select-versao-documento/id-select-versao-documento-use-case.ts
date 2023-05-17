import { inject, injectable } from "tsyringe"
import { IVersaoDocumentoRepository } from '@modules/digitalizacao/repositories/i-versao-documento-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectVersaoDocumentoUseCase {
  constructor(
    @inject('VersaoDocumentoRepository')
    private versaoDocumentoRepository: IVersaoDocumentoRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const versaoDocumento = await this.versaoDocumentoRepository.idSelect(id)

    return versaoDocumento
  }
}

export { IdSelectVersaoDocumentoUseCase }
