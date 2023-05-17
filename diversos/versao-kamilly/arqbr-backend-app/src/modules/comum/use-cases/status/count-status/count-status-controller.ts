import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountStatusUseCase } from './count-status-use-case'

class CountStatusController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countStatusUseCase = container.resolve(CountStatusUseCase)

    const statusesCount = await countStatusUseCase.execute({
      search: search as string
    })

    return response.status(statusesCount.statusCode).json(statusesCount)
  }
}

export { CountStatusController }
