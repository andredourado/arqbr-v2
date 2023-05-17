import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountTimeColetaUseCase } from './count-time-coleta-use-case'

class CountTimeColetaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countTimeColetaUseCase = container.resolve(CountTimeColetaUseCase)

    const timesColetaCount = await countTimeColetaUseCase.execute({
      search: search as string
    })

    return response.status(timesColetaCount.statusCode).json(timesColetaCount)
  }
}

export { CountTimeColetaController }
