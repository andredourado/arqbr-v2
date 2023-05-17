import { inject, injectable } from 'tsyringe'
import { DocumentoDigitalCampo } from '@modules/digitalizacao/infra/typeorm/entities/documento-digital-campo'
import { IDocumentoDigitalCampoRepository } from '@modules/digitalizacao/repositories/i-documento-digital-campo-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
}

@injectable()
class CountDocumentoDigitalCampoUseCase {
  constructor(
    @inject('DocumentoDigitalCampoRepository')
    private documentoDigitalCampoRepository: IDocumentoDigitalCampoRepository
  ) {}

  async execute({
    search
  }: IRequest): Promise<HttpResponse> {
    const documentosDigitaisCamposCount = await this.documentoDigitalCampoRepository.count(
      search
    )

    return documentosDigitaisCamposCount
  }
}

export { CountDocumentoDigitalCampoUseCase }
