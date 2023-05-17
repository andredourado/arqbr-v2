import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountEscalaUseCase } from './count-escala-use-case'

class CountEscalaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countEscalaUseCase = container.resolve(CountEscalaUseCase)

    const escalasCount = await countEscalaUseCase.execute({
      search: search as string
    })

    return response.status(escalasCount.statusCode).json(escalasCount)
  }
}

export { CountEscalaController }
