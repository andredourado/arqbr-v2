import { inject, injectable } from "tsyringe"
import { ICampoDocumentoRepository } from '@modules/digitalizacao/repositories/i-campo-documento-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectCampoDocumentoUseCase {
  constructor(
    @inject('CampoDocumentoRepository')
    private campoDocumentoRepository: ICampoDocumentoRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const campoDocumento = await this.campoDocumentoRepository.idSelect(id)

    return campoDocumento
  }
}

export { IdSelectCampoDocumentoUseCase }
