import { inject, injectable } from 'tsyringe'
import { IFrequenciaRepository } from '@modules/comum/repositories/i-frequencia-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectFrequenciaUseCase {
  constructor(
    @inject('FrequenciaRepository')
    private frequenciaRepository: IFrequenciaRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const frequencias = await this.frequenciaRepository.select(filter)

    const newFrequencias = {
      items: frequencias.data,
      hasNext: false
    }

    return newFrequencias
  }
}

export { SelectFrequenciaUseCase }
