import { inject, injectable } from 'tsyringe'
import { Jornada } from '@modules/pessoas/infra/typeorm/entities/jornada'
import { IJornadaRepository } from '@modules/pessoas/repositories/i-jornada-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
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
class CreateJornadaUseCase {
  constructor(
    @inject('JornadaRepository')
    private jornadaRepository: IJornadaRepository
  ) {}

  async execute({
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
  }: IRequest): Promise<Jornada> {
    const result = await this.jornadaRepository.create({
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
      .then(jornadaResult => {
        return jornadaResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateJornadaUseCase }
