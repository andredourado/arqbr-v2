import { inject, injectable } from 'tsyringe'
import { Escala } from '@modules/pessoas/infra/typeorm/entities/escala'
import { IEscalaRepository } from '@modules/pessoas/repositories/i-escala-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  pessoaId: string
  jornadaId: string
  desabilitado: boolean
}

@injectable()
class UpdateEscalaUseCase {
  constructor(
    @inject('EscalaRepository')
    private escalaRepository: IEscalaRepository
  ) {}

  async execute({
    id,
    pessoaId,
    jornadaId,
    desabilitado
  }: IRequest): Promise<HttpResponse> {
    const escala = await this.escalaRepository.update({
      id,
      pessoaId,
      jornadaId,
      desabilitado
    })

    return escala
  }
}

export { UpdateEscalaUseCase }
