import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateStatusUseCase } from './update-status-use-case'

class UpdateStatusController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      servicoId,
      sequencia,
      descricao,
      desabilitado
    } = request.body

    const { id } = request.params

    const updateStatusUseCase = container.resolve(UpdateStatusUseCase)

    const result = await updateStatusUseCase.execute({
        id,
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

export { UpdateStatusController }
