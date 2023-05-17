import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectStatusUseCase } from './id-select-status-use-case'

class IdSelectStatusController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectStatusUseCase = container.resolve(IdSelectStatusUseCase)

    const status = await idSelectStatusUseCase.execute({
      id: id as string
    })

    return response.json(status.data)
  }
}

export { IdSelectStatusController }
