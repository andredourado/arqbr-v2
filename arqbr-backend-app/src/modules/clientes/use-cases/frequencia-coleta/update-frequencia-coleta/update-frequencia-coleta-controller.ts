import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateFrequenciaColetaUseCase } from './update-frequencia-coleta-use-case'

class UpdateFrequenciaColetaController {
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

    const { id } = request.params

    const updateFrequenciaColetaUseCase = container.resolve(UpdateFrequenciaColetaUseCase)

    const result = await updateFrequenciaColetaUseCase.execute({
        id,
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

export { UpdateFrequenciaColetaController }
