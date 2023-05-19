import { inject, injectable } from 'tsyringe'
import { DocumentoDigitalCampo } from '@modules/digitalizacao/infra/typeorm/entities/documento-digital-campo'
import { IDocumentoDigitalCampoRepository } from '@modules/digitalizacao/repositories/i-documento-digital-campo-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeleteDocumentoDigitalCampoUseCase {
  constructor(
    @inject('DocumentoDigitalCampoRepository')
    private documentoDigitalCampoRepository: IDocumentoDigitalCampoRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const documentoDigitalCampo = await this.documentoDigitalCampoRepository.delete(id)

    return documentoDigitalCampo
  }
}

export { DeleteDocumentoDigitalCampoUseCase }
