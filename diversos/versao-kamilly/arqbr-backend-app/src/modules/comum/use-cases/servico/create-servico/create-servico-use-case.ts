import { inject, injectable } from 'tsyringe'
import { Servico } from '@modules/comum/infra/typeorm/entities/servico'
import { IServicoRepository } from '@modules/comum/repositories/i-servico-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  descricao: string
  desabilitado: boolean
}

@injectable()
class CreateServicoUseCase {
  constructor(
    @inject('ServicoRepository')
    private servicoRepository: IServicoRepository
  ) {}

  async execute({
    descricao,
    desabilitado
  }: IRequest): Promise<Servico> {
    const result = await this.servicoRepository.create({
        descricao,
        desabilitado
      })
      .then(servicoResult => {
        return servicoResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateServicoUseCase }
