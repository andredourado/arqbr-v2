import { inject, injectable } from 'tsyringe'
import { IPontoColetaRepository } from '@modules/clientes/repositories/i-ponto-coleta-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectPontoColetaUseCase {
  constructor(
    @inject('PontoColetaRepository')
    private pontoColetaRepository: IPontoColetaRepository
  ) {}

  async execute({
    filter,
    clienteId
  }): Promise<ResponseProps> {
    const pontosColeta = await this.pontoColetaRepository.select(filter, clienteId)

    const newPontosColeta = {
      items: pontosColeta.data,
      hasNext: false
    }

    return newPontosColeta
  }
}

export { SelectPontoColetaUseCase }
