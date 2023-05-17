import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetTimeColetaUseCase } from './get-time-coleta-use-case'

class GetTimeColetaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getTimeColetaUseCase = container.resolve(GetTimeColetaUseCase)
    const timeColeta = await getTimeColetaUseCase.execute(id)

    return response.status(timeColeta.statusCode).json(timeColeta.data)
  }
}

export { GetTimeColetaController }
