import { inject, injectable } from 'tsyringe'
import { IJornadaRepository } from '@modules/pessoas/repositories/i-jornada-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectJornadaUseCase {
  constructor(
    @inject('JornadaRepository')
    private jornadaRepository: IJornadaRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const jornadas = await this.jornadaRepository.select(filter)

    const newJornadas = {
      items: jornadas.data,
      hasNext: false
    }

    return newJornadas
  }
}

export { SelectJornadaUseCase }
