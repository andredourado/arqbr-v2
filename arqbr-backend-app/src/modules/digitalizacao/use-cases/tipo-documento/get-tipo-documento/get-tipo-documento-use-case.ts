import { inject, injectable } from 'tsyringe'
import { TipoDocumento } from '@modules/digitalizacao/infra/typeorm/entities/tipo-documento'
import { ITipoDocumentoRepository } from '@modules/digitalizacao/repositories/i-tipo-documento-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetTipoDocumentoUseCase {
  constructor(
    @inject('TipoDocumentoRepository')
    private tipoDocumentoRepository: ITipoDocumentoRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const tipoDocumento = await this.tipoDocumentoRepository.get(id)

    return tipoDocumento
  }
}

export { GetTipoDocumentoUseCase }
