import { inject, injectable } from "tsyringe"
import { IDocumentoRepository } from '@modules/classificacao/repositories/i-documento-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectDocumentoUseCase {
  constructor(
    @inject('DocumentoRepository')
    private documentoRepository: IDocumentoRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const documento = await this.documentoRepository.idSelect(id)

    return documento
  }
}

export { IdSelectDocumentoUseCase }
