import { inject, injectable } from 'tsyringe'
import { IDocumentoDigitalRepository } from '@modules/digitalizacao/repositories/i-documento-digital-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectDocumentoDigitalUseCase {
  constructor(
    @inject('DocumentoDigitalRepository')
    private documentoDigitalRepository: IDocumentoDigitalRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const documentosDigitais = await this.documentoDigitalRepository.select(filter)

    const newDocumentosDigitais = {
      items: documentosDigitais.data,
      hasNext: false
    }

    return newDocumentosDigitais
  }
}

export { SelectDocumentoDigitalUseCase }
