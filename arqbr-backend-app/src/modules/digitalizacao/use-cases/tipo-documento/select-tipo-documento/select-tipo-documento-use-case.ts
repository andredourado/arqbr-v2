import { inject, injectable } from 'tsyringe'
import { ITipoDocumentoRepository } from '@modules/digitalizacao/repositories/i-tipo-documento-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectTipoDocumentoUseCase {
  constructor(
    @inject('TipoDocumentoRepository')
    private tipoDocumentoRepository: ITipoDocumentoRepository
  ) {}

  async execute({
    filter,
    clienteId,
    departamentoId
  }): Promise<ResponseProps> {
    const tiposDocumento = await this.tipoDocumentoRepository.select(filter, clienteId, departamentoId)

    const newTiposDocumento = {
      items: tiposDocumento.data,
      hasNext: false
    }

    return newTiposDocumento
  }
}

export { SelectTipoDocumentoUseCase }
