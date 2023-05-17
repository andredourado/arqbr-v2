import { inject, injectable } from 'tsyringe'
import { ITimeColetaRepository } from '@modules/coleta/repositories/i-time-coleta-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectTimeColetaUseCase {
  constructor(
    @inject('TimeColetaRepository')
    private timeColetaRepository: ITimeColetaRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const timesColeta = await this.timeColetaRepository.select(filter)

    const newTimesColeta = {
      items: timesColeta.data,
      hasNext: false
    }

    return newTimesColeta
  }
}

export { SelectTimeColetaUseCase }
