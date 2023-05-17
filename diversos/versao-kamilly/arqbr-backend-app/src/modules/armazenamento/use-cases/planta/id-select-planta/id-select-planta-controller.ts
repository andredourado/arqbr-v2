import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectPlantaUseCase } from './id-select-planta-use-case'

class IdSelectPlantaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectPlantaUseCase = container.resolve(IdSelectPlantaUseCase)

    const planta = await idSelectPlantaUseCase.execute({
      id: id as string
    })

    return response.json(planta.data)
  }
}

export { IdSelectPlantaController }
