import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteEscalaUseCase } from './delete-escala-use-case'
import { ListEscalaUseCase } from '../list-escala/list-escala-use-case'

class DeleteEscalaController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteEscalaUseCase = container.resolve(DeleteEscalaUseCase)
    await deleteEscalaUseCase.execute(id)


    // restore list with updated records

    const listEscalaUseCase = container.resolve(ListEscalaUseCase)
    const escalas = await listEscalaUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(escalas)
  }
}

export { DeleteEscalaController }
