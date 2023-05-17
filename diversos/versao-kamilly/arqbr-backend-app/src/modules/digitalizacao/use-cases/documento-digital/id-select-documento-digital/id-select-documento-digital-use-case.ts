import { inject, injectable } from "tsyringe"
import { IDocumentoDigitalRepository } from '@modules/digitalizacao/repositories/i-documento-digital-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectDocumentoDigitalUseCase {
  constructor(
    @inject('DocumentoDigitalRepository')
    private documentoDigitalRepository: IDocumentoDigitalRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const documentoDigital = await this.documentoDigitalRepository.idSelect(id)

    return documentoDigital
  }
}

export { IdSelectDocumentoDigitalUseCase }
