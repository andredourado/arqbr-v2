import { inject, injectable } from 'tsyringe'
import { ICampoDocumentoRepository } from '@modules/digitalizacao/repositories/i-campo-documento-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectCampoDocumentoUseCase {
  constructor(
    @inject('CampoDocumentoRepository')
    private campoDocumentoRepository: ICampoDocumentoRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const camposDocumento = await this.campoDocumentoRepository.select(filter)

    const newCamposDocumento = {
      items: camposDocumento.data,
      hasNext: false
    }

    return newCamposDocumento
  }
}

export { SelectCampoDocumentoUseCase }
