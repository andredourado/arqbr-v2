import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateJornadaUseCase } from './update-jornada-use-case'

class UpdateJornadaController {
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

    const { id } = request.params

    const updateJornadaUseCase = container.resolve(UpdateJornadaUseCase)

    const result = await updateJornadaUseCase.execute({
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
      .then(jornadaResult => {
        return jornadaResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdateJornadaController }
