import { inject, injectable } from "tsyringe"
import { IDocumentoDigitalCampoRepository } from '@modules/digitalizacao/repositories/i-documento-digital-campo-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectDocumentoDigitalCampoUseCase {
  constructor(
    @inject('DocumentoDigitalCampoRepository')
    private documentoDigitalCampoRepository: IDocumentoDigitalCampoRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const documentoDigitalCampo = await this.documentoDigitalCampoRepository.idSelect(id)

    return documentoDigitalCampo
  }
}

export { IdSelectDocumentoDigitalCampoUseCase }
