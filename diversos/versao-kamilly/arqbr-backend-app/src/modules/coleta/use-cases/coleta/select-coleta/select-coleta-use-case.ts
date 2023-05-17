import { inject, injectable } from 'tsyringe'
import { IColetaRepository } from '@modules/coleta/repositories/i-coleta-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectColetaUseCase {
  constructor(
    @inject('ColetaRepository')
    private coletaRepository: IColetaRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const coletas = await this.coletaRepository.select(filter)

    const newColetas = {
      items: coletas.data,
      hasNext: false
    }

    return newColetas
  }
}

export { SelectColetaUseCase }
