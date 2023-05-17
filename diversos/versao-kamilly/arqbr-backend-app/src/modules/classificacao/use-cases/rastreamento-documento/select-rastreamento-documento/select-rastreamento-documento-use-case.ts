import { inject, injectable } from 'tsyringe'
import { IRastreamentoDocumentoRepository } from '@modules/classificacao/repositories/i-rastreamento-documento-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectRastreamentoDocumentoUseCase {
  constructor(
    @inject('RastreamentoDocumentoRepository')
    private rastreamentoDocumentoRepository: IRastreamentoDocumentoRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const rastreamentoDocumentos = await this.rastreamentoDocumentoRepository.select(filter)

    const newRastreamentoDocumentos = {
      items: rastreamentoDocumentos.data,
      hasNext: false
    }

    return newRastreamentoDocumentos
  }
}

export { SelectRastreamentoDocumentoUseCase }
