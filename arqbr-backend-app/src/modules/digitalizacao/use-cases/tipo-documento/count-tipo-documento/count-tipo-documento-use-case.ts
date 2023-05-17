import { inject, injectable } from 'tsyringe'
import { TipoDocumento } from '@modules/digitalizacao/infra/typeorm/entities/tipo-documento'
import { ITipoDocumentoRepository } from '@modules/digitalizacao/repositories/i-tipo-documento-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountTipoDocumentoUseCase {
  constructor(
    @inject('TipoDocumentoRepository')
    private tipoDocumentoRepository: ITipoDocumentoRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const tiposDocumentoCount = await this.tipoDocumentoRepository.count(
      search,
      filter
    )

    return tiposDocumentoCount
  }
}

export { CountTipoDocumentoUseCase }
