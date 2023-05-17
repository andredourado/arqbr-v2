import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetPlantaUseCase } from './get-planta-use-case'

class GetPlantaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getPlantaUseCase = container.resolve(GetPlantaUseCase)
    const planta = await getPlantaUseCase.execute(id)

    return response.status(planta.statusCode).json(planta.data)
  }
}

export { GetPlantaController }
