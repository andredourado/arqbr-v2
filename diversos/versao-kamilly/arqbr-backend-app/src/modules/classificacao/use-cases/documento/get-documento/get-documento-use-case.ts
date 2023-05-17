import { inject, injectable } from 'tsyringe'
import { Documento } from '@modules/classificacao/infra/typeorm/entities/documento'
import { IDocumentoRepository } from '@modules/classificacao/repositories/i-documento-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetDocumentoUseCase {
  constructor(
    @inject('DocumentoRepository')
    private documentoRepository: IDocumentoRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const documento = await this.documentoRepository.get(id)

    return documento
  }
}

export { GetDocumentoUseCase }
