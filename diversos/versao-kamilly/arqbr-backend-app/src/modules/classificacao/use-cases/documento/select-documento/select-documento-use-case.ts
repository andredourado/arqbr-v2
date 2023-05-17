import { inject, injectable } from 'tsyringe'
import { IDocumentoRepository } from '@modules/classificacao/repositories/i-documento-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectDocumentoUseCase {
  constructor(
    @inject('DocumentoRepository')
    private documentoRepository: IDocumentoRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const documentos = await this.documentoRepository.select(filter)

    const newDocumentos = {
      items: documentos.data,
      hasNext: false
    }

    return newDocumentos
  }
}

export { SelectDocumentoUseCase }
