import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountPlantaUseCase } from './count-planta-use-case'

class CountPlantaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countPlantaUseCase = container.resolve(CountPlantaUseCase)

    const plantasCount = await countPlantaUseCase.execute({
      search: search as string
    })

    return response.status(plantasCount.statusCode).json(plantasCount)
  }
}

export { CountPlantaController }
