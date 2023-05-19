import { inject, injectable } from 'tsyringe'
import { IDocumentoDigitalCampoRepository } from '@modules/digitalizacao/repositories/i-documento-digital-campo-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectDocumentoDigitalCampoUseCase {
  constructor(
    @inject('DocumentoDigitalCampoRepository')
    private documentoDigitalCampoRepository: IDocumentoDigitalCampoRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const documentosDigitaisCampos = await this.documentoDigitalCampoRepository.select(filter)

    const newDocumentosDigitaisCampos = {
      items: documentosDigitaisCampos.data,
      hasNext: false
    }

    return newDocumentosDigitaisCampos
  }
}

export { SelectDocumentoDigitalCampoUseCase }
