import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateFrequenciaColetaUseCase } from './create-frequencia-coleta-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateFrequenciaColetaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      clienteId,
      diasDoMes,
      segHorarioInicio,
      segHorarioFim,
      terHorarioInicio,
      terHorarioFim,
      quaHorarioInicio,
      quaHorarioFim,
      quiHorarioInicio,
      quiHorarioFim,
      sexHorarioInicio,
      sexHorarioFim,
      sabHorarioInicio,
      sabHorarioFim,
      domHorarioInicio,
      domHorarioFim,
      desabilitado
    } = request.body

    const createFrequenciaColetaUseCase = container.resolve(CreateFrequenciaColetaUseCase)

    const result = await createFrequenciaColetaUseCase.execute({
        clienteId,
        diasDoMes,
        segHorarioInicio,
        segHorarioFim,
        terHorarioInicio,
        terHorarioFim,
        quaHorarioInicio,
        quaHorarioFim,
        quiHorarioInicio,
        quiHorarioFim,
        sexHorarioInicio,
        sexHorarioFim,
        sabHorarioInicio,
        sabHorarioFim,
        domHorarioInicio,
        domHorarioFim,
        desabilitado
      })
      .then(frequenciaColetaResult => {
        return frequenciaColetaResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateFrequenciaColetaController }
