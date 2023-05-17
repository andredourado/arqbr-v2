import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateJornadaUseCase } from './create-jornada-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateJornadaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
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
    } = request.body

    const createJornadaUseCase = container.resolve(CreateJornadaUseCase)

    const result = await createJornadaUseCase.execute({
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

    return response.status(result.statusCode).json(result)
  }
}

export { CreateJornadaController }
