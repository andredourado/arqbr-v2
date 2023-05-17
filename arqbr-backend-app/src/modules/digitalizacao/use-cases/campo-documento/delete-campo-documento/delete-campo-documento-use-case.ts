import { inject, injectable } from 'tsyringe'
import { CampoDocumento } from '@modules/digitalizacao/infra/typeorm/entities/campo-documento'
import { ICampoDocumentoRepository } from '@modules/digitalizacao/repositories/i-campo-documento-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeleteCampoDocumentoUseCase {
  constructor(
    @inject('CampoDocumentoRepository')
    private campoDocumentoRepository: ICampoDocumentoRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const campoDocumento = await this.campoDocumentoRepository.delete(id)

    return campoDocumento
  }
}

export { DeleteCampoDocumentoUseCase }
