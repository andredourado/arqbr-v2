import { inject, injectable } from 'tsyringe'
import { TipoDocumento } from '@modules/digitalizacao/infra/typeorm/entities/tipo-documento'
import { ITipoDocumentoRepository } from '@modules/digitalizacao/repositories/i-tipo-documento-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetTipoDocumentoByIdentificadorUseCase {
  constructor(
    @inject('TipoDocumentoRepository')
    private tipoDocumentoRepository: ITipoDocumentoRepository
  ) {}

  async execute(identificador: string): Promise<HttpResponse> {
    const tipoDocumento = await this.tipoDocumentoRepository.getByIdentificador(identificador)

    return tipoDocumento
  }
}

export { GetTipoDocumentoByIdentificadorUseCase }
