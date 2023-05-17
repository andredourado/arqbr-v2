import { inject, injectable } from 'tsyringe'
import { Escala } from '@modules/pessoas/infra/typeorm/entities/escala'
import { IEscalaRepository } from '@modules/pessoas/repositories/i-escala-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  pessoaId: string
  jornadaId: string
  desabilitado: boolean
}

@injectable()
class CreateEscalaUseCase {
  constructor(
    @inject('EscalaRepository')
    private escalaRepository: IEscalaRepository
  ) {}

  async execute({
    pessoaId,
    jornadaId,
    desabilitado
  }: IRequest): Promise<Escala> {
    const result = await this.escalaRepository.create({
        pessoaId,
        jornadaId,
        desabilitado
      })
      .then(escalaResult => {
        return escalaResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateEscalaUseCase }
