import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteColetaUseCase } from './delete-coleta-use-case'
import { ListColetaUseCase } from '../list-coleta/list-coleta-use-case'

class DeleteColetaController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteColetaUseCase = container.resolve(DeleteColetaUseCase)
    await deleteColetaUseCase.execute(id)


    // restore list with updated records

    const listColetaUseCase = container.resolve(ListColetaUseCase)
    const coletas = await listColetaUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(coletas)
  }
}

export { DeleteColetaController }
