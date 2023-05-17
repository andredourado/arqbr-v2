import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeletePlantaUseCase } from './delete-planta-use-case'
import { ListPlantaUseCase } from '../list-planta/list-planta-use-case'

class DeletePlantaController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deletePlantaUseCase = container.resolve(DeletePlantaUseCase)
    await deletePlantaUseCase.execute(id)


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

export { DeletePlantaController }
