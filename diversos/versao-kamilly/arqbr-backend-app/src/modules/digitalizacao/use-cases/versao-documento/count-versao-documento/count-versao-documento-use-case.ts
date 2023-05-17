import { inject, injectable } from 'tsyringe'
import { VersaoDocumento } from '@modules/digitalizacao/infra/typeorm/entities/versao-documento'
import { IVersaoDocumentoRepository } from '@modules/digitalizacao/repositories/i-versao-documento-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
}

@injectable()
class CountVersaoDocumentoUseCase {
  constructor(
    @inject('VersaoDocumentoRepository')
    private versaoDocumentoRepository: IVersaoDocumentoRepository
  ) {}

  async execute({
    search
  }: IRequest): Promise<HttpResponse> {
    const versoesDocumentoCount = await this.versaoDocumentoRepository.count(
      search
    )

    return versoesDocumentoCount
  }
}

export { CountVersaoDocumentoUseCase }
