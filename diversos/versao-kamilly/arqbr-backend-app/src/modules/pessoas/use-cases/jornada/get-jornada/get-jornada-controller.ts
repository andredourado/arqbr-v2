import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetJornadaUseCase } from './get-jornada-use-case'

class GetJornadaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getJornadaUseCase = container.resolve(GetJornadaUseCase)
    const jornada = await getJornadaUseCase.execute(id)

    return response.status(jornada.statusCode).json(jornada.data)
  }
}

export { GetJornadaController }
