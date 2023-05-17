import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectPlantaUseCase } from './select-planta-use-case'

class SelectPlantaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter, unidadeId } = request.query

    const selectPlantaUseCase = container.resolve(SelectPlantaUseCase)

    const plantas = await selectPlantaUseCase.execute({
      filter: filter as string,
      unidadeId: unidadeId as string
    })

    return response.json(plantas)
  }
}

export { SelectPlantaController }
