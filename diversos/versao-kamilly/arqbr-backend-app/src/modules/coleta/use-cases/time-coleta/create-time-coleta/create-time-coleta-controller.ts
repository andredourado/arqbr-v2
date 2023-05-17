import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateTimeColetaUseCase } from './create-time-coleta-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateTimeColetaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      coletaId,
      pessoaId
    } = request.body

    const createTimeColetaUseCase = container.resolve(CreateTimeColetaUseCase)

    const result = await createTimeColetaUseCase.execute({
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

export { CreateTimeColetaController }
