import { inject, injectable } from 'tsyringe'
import { IDocumentoDigitalCampoRepository } from '@modules/digitalizacao/repositories/i-documento-digital-campo-repository'
import { IDocumentoDigitalCampoDTO } from '@modules/digitalizacao/dtos/i-documento-digital-campo-dto';
import { HttpResponse } from '@shared/helpers';

interface IRequest {
  documentoDigitalId: string
}

interface ResponseProps {
  items: IDocumentoDigitalCampoDTO[],
  hasNext: boolean
}

@injectable()
class ListByDocumentoDocumentoDigitalCampoUseCase {
  constructor(
    @inject('DocumentoDigitalCampoRepository')
    private documentoDigitalCampoRepository: IDocumentoDigitalCampoRepository
  ) {}

  async execute({
    documentoDigitalId 
  }: IRequest): Promise<HttpResponse> {

    const documentosDigitaisCampos = await this.documentoDigitalCampoRepository.listByDocumento(
      documentoDigitalId
    )

    return documentosDigitaisCampos
  }
}

export { ListByDocumentoDocumentoDigitalCampoUseCase }
