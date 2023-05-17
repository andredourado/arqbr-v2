import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetStatusUseCase } from './get-status-use-case'

class GetStatusController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getStatusUseCase = container.resolve(GetStatusUseCase)
    const status = await getStatusUseCase.execute(id)

    return response.status(status.statusCode).json(status.data)
  }
}

export { GetStatusController }
