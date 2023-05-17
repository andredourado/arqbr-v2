import { inject, injectable } from 'tsyringe'
import { Documento } from '@modules/classificacao/infra/typeorm/entities/documento'
import { IDocumentoRepository } from '@modules/classificacao/repositories/i-documento-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
}

@injectable()
class CountDocumentoUseCase {
  constructor(
    @inject('DocumentoRepository')
    private documentoRepository: IDocumentoRepository
  ) {}

  async execute({
    search
  }: IRequest): Promise<HttpResponse> {
    const documentosCount = await this.documentoRepository.count(
      search
    )

    return documentosCount
  }
}

export { CountDocumentoUseCase }
