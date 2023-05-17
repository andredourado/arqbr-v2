import { inject, injectable } from 'tsyringe'
import { IFrequenciaColetaRepository } from '@modules/clientes/repositories/i-frequencia-coleta-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectFrequenciaColetaUseCase {
  constructor(
    @inject('FrequenciaColetaRepository')
    private frequenciaColetaRepository: IFrequenciaColetaRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const frequenciaColetas = await this.frequenciaColetaRepository.select(filter)

    const newFrequenciaColetas = {
      items: frequenciaColetas.data,
      hasNext: false
    }

    return newFrequenciaColetas
  }
}

export { SelectFrequenciaColetaUseCase }
