import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateTimeColetaUseCase } from './update-time-coleta-use-case'

class UpdateTimeColetaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      coletaId,
      pessoaId
    } = request.body

    const { id } = request.params

    const updateTimeColetaUseCase = container.resolve(UpdateTimeColetaUseCase)

    const result = await updateTimeColetaUseCase.execute({
        id,
        coletaId,
        pessoaId
      })
      .then(timeColetaResult => {
        return timeColetaResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdateTimeColetaController }
