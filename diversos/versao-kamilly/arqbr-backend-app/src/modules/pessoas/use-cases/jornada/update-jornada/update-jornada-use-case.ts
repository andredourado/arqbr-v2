import { inject, injectable } from 'tsyringe'
import { Jornada } from '@modules/pessoas/infra/typeorm/entities/jornada'
import { IJornadaRepository } from '@modules/pessoas/repositories/i-jornada-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  descricao: string
  segPrimeiraInicio: string
  segPrimeiraFim: string
  segSegundaInicio: string
  segSegundaFim: string
  terPrimeiraInicio: string
  terPrimeiraFim: string
  terSegundaInicio: string
  terSegundaFim: string
  quaPrimeiraInicio: string
  quaPrimeiraFim: string
  quaSegundaInicio: string
  quaSegundaFim: string
  quiPrimeiraInicio: string
  quiPrimeiraFim: string
  quiSegundaInicio: string
  quiSegundaFim: string
  sexPrimeiraInicio: string
  sexPrimeiraFim: string
  sexSegundaInicio: string
  sexSegundaFim: string
  sabPrimeiraInicio: string
  sabPrimeiraFim: string
  sabSegundaInicio: string
  sabSegundaFim: string
  domPrimeiraInicio: string
  domPrimeiraFim: string
  domSegundaInicio: string
  domSegundaFim: string
  desabilitado: boolean
}

@injectable()
class UpdateJornadaUseCase {
  constructor(
    @inject('JornadaRepository')
    private jornadaRepository: IJornadaRepository
  ) {}

  async execute({
    id,
    descricao,
    segPrimeiraInicio,
    segPrimeiraFim,
    segSegundaInicio,
    segSegundaFim,
    terPrimeiraInicio,
    terPrimeiraFim,
    terSegundaInicio,
    terSegundaFim,
    quaPrimeiraInicio,
    quaPrimeiraFim,
    quaSegundaInicio,
    quaSegundaFim,
    quiPrimeiraInicio,
    quiPrimeiraFim,
    quiSegundaInicio,
    quiSegundaFim,
    sexPrimeiraInicio,
    sexPrimeiraFim,
    sexSegundaInicio,
    sexSegundaFim,
    sabPrimeiraInicio,
    sabPrimeiraFim,
    sabSegundaInicio,
    sabSegundaFim,
    domPrimeiraInicio,
    domPrimeiraFim,
    domSegundaInicio,
    domSegundaFim,
    desabilitado
  }: IRequest): Promise<HttpResponse> {
    const jornada = await this.jornadaRepository.update({
      id,
      descricao,
      segPrimeiraInicio,
      segPrimeiraFim,
      segSegundaInicio,
      segSegundaFim,
      terPrimeiraInicio,
      terPrimeiraFim,
      terSegundaInicio,
      terSegundaFim,
      quaPrimeiraInicio,
      quaPrimeiraFim,
      quaSegundaInicio,
      quaSegundaFim,
      quiPrimeiraInicio,
      quiPrimeiraFim,
      quiSegundaInicio,
      quiSegundaFim,
      sexPrimeiraInicio,
      sexPrimeiraFim,
      sexSegundaInicio,
      sexSegundaFim,
      sabPrimeiraInicio,
      sabPrimeiraFim,
      sabSegundaInicio,
      sabSegundaFim,
      domPrimeiraInicio,
      domPrimeiraFim,
      domSegundaInicio,
      domSegundaFim,
      desabilitado
    })

    return jornada
  }
}

export { UpdateJornadaUseCase }
