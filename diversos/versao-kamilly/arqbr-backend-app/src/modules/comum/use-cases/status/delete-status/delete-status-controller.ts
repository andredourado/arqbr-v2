import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteStatusUseCase } from './delete-status-use-case'
import { ListStatusUseCase } from '../list-status/list-status-use-case'

class DeleteStatusController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteStatusUseCase = container.resolve(DeleteStatusUseCase)
    await deleteStatusUseCase.execute(id)


    // restore list with updated records

    const listStatusUseCase = container.resolve(ListStatusUseCase)
    const statuses = await listStatusUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(statuses)
  }
}

export { DeleteStatusController }
