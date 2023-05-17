import { inject, injectable } from 'tsyringe'
import { TipoDocumento } from '@modules/clientes/infra/typeorm/entities/tipo-documento'
import { ITipoDocumentoRepository } from '@modules/clientes/repositories/i-tipo-documento-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
}

@injectable()
class CountTipoDocumentoUseCase {
  constructor(
    @inject('TipoDocumentoRepository')
    private tipoDocumentoRepository: ITipoDocumentoRepository
  ) {}

  async execute({
    search
  }: IRequest): Promise<HttpResponse> {
    const tiposDocumentoCount = await this.tipoDocumentoRepository.count(
      search
    )

    return tiposDocumentoCount
  }
}

export { CountTipoDocumentoUseCase }
