import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteTimeColetaUseCase } from './delete-time-coleta-use-case'
import { ListTimeColetaUseCase } from '../list-time-coleta/list-time-coleta-use-case'

class DeleteTimeColetaController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteTimeColetaUseCase = container.resolve(DeleteTimeColetaUseCase)
    await deleteTimeColetaUseCase.execute(id)


    // restore list with updated records

    const listTimeColetaUseCase = container.resolve(ListTimeColetaUseCase)
    const timesColeta = await listTimeColetaUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(timesColeta)
  }
}

export { DeleteTimeColetaController }
