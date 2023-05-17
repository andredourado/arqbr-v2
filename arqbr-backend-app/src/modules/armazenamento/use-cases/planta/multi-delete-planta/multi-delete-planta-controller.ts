import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeletePlantaUseCase } from './multi-delete-planta-use-case'
import { ListPlantaUseCase } from '../list-planta/list-planta-use-case'

class MultiDeletePlantaController {
  async handle(request: Request, response: Response ): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeletePlantaUseCase = container.resolve(MultiDeletePlantaUseCase)
    await multiDeletePlantaUseCase.execute(ids)


    // restore list with updated records

    const listPlantaUseCase = container.resolve(ListPlantaUseCase)
    const plantas = await listPlantaUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(plantas)
  }
}

export { MultiDeletePlantaController }
