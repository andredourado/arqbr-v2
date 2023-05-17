import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectStatusUseCase } from './select-status-use-case'

class SelectStatusController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectStatusUseCase = container.resolve(SelectStatusUseCase)

    const statuses = await selectStatusUseCase.execute({
      filter: filter as string,
    })

    return response.json(statuses)
  }
}

export { SelectStatusController }
