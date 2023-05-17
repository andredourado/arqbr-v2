import { inject, injectable } from 'tsyringe'
import { IServicoRepository } from '@modules/comum/repositories/i-servico-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectServicoUseCase {
  constructor(
    @inject('ServicoRepository')
    private servicoRepository: IServicoRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const servicos = await this.servicoRepository.select(filter)

    const newServicos = {
      items: servicos.data,
      hasNext: false
    }

    return newServicos
  }
}

export { SelectServicoUseCase }
