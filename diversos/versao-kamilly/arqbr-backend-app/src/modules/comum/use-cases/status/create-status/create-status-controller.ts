import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateStatusUseCase } from './create-status-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateStatusController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      servicoId,
      sequencia,
      descricao,
      desabilitado
    } = request.body

    const createStatusUseCase = container.resolve(CreateStatusUseCase)

    const result = await createStatusUseCase.execute({
        servicoId,
        sequencia,
        descricao,
        desabilitado
      })
      .then(statusResult => {
        return statusResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateStatusController }
