import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteJornadaUseCase } from './delete-jornada-use-case'
import { ListJornadaUseCase } from '../list-jornada/list-jornada-use-case'

class DeleteJornadaController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteJornadaUseCase = container.resolve(DeleteJornadaUseCase)
    await deleteJornadaUseCase.execute(id)


    // restore list with updated records

    const listJornadaUseCase = container.resolve(ListJornadaUseCase)
    const jornadas = await listJornadaUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(jornadas)
  }
}

export { DeleteJornadaController }
