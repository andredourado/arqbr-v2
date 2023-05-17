import { inject, injectable } from 'tsyringe'
import { DocumentoDigital } from '@modules/digitalizacao/infra/typeorm/entities/documento-digital'
import { IDocumentoDigitalRepository } from '@modules/digitalizacao/repositories/i-documento-digital-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountDocumentoDigitalUseCase {
  constructor(
    @inject('DocumentoDigitalRepository')
    private documentoDigitalRepository: IDocumentoDigitalRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const documentosDigitaisCount = await this.documentoDigitalRepository.count(
      search,
      filter
    )

    return documentosDigitaisCount
  }
}

export { CountDocumentoDigitalUseCase }
