import { inject, injectable } from "tsyringe"
import { ITipoDocumentoRepository } from '@modules/clientes/repositories/i-tipo-documento-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectTipoDocumentoUseCase {
  constructor(
    @inject('TipoDocumentoRepository')
    private tipoDocumentoRepository: ITipoDocumentoRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const tipoDocumento = await this.tipoDocumentoRepository.idSelect(id)

    return tipoDocumento
  }
}

export { IdSelectTipoDocumentoUseCase }
