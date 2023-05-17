import { inject, injectable } from 'tsyringe'
import { DocumentoDigital } from '@modules/digitalizacao/infra/typeorm/entities/documento-digital'
import { IDocumentoDigitalRepository } from '@modules/digitalizacao/repositories/i-documento-digital-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeleteDocumentoDigitalUseCase {
  constructor(
    @inject('DocumentoDigitalRepository')
    private documentoDigitalRepository: IDocumentoDigitalRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const documentoDigital = await this.documentoDigitalRepository.delete(id)

    return documentoDigital
  }
}

export { DeleteDocumentoDigitalUseCase }
