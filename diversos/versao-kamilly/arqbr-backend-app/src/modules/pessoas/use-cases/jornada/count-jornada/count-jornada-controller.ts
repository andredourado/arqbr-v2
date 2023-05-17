import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountJornadaUseCase } from './count-jornada-use-case'

class CountJornadaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countJornadaUseCase = container.resolve(CountJornadaUseCase)

    const jornadasCount = await countJornadaUseCase.execute({
      search: search as string
    })

    return response.status(jornadasCount.statusCode).json(jornadasCount)
  }
}

export { CountJornadaController }
