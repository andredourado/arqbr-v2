import { inject, injectable } from 'tsyringe'
import { IVersaoDocumentoRepository } from '@modules/digitalizacao/repositories/i-versao-documento-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectVersaoDocumentoUseCase {
  constructor(
    @inject('VersaoDocumentoRepository')
    private versaoDocumentoRepository: IVersaoDocumentoRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const versoesDocumento = await this.versaoDocumentoRepository.select(filter)

    const newVersoesDocumento = {
      items: versoesDocumento.data,
      hasNext: false
    }

    return newVersoesDocumento
  }
}

export { SelectVersaoDocumentoUseCase }
