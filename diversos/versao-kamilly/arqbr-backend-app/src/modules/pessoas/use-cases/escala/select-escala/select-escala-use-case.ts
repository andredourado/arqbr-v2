import { inject, injectable } from 'tsyringe'
import { IEscalaRepository } from '@modules/pessoas/repositories/i-escala-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectEscalaUseCase {
  constructor(
    @inject('EscalaRepository')
    private escalaRepository: IEscalaRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const escalas = await this.escalaRepository.select(filter)

    const newEscalas = {
      items: escalas.data,
      hasNext: false
    }

    return newEscalas
  }
}

export { SelectEscalaUseCase }
