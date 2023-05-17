import { inject, injectable } from 'tsyringe'
import { ISolicitanteRepository } from '@modules/clientes/repositories/i-solicitante-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectSolicitanteUseCase {
  constructor(
    @inject('SolicitanteRepository')
    private solicitanteRepository: ISolicitanteRepository
  ) {}

  async execute({
    filter,
    departamentoId
  }): Promise<ResponseProps> {
    const solicitantes = await this.solicitanteRepository.select(filter, departamentoId)

    const newSolicitantes = {
      items: solicitantes.data,
      hasNext: false
    }

    return newSolicitantes
  }
}

export { SelectSolicitanteUseCase }
