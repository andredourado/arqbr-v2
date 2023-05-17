import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteSugestaoUseCase } from './delete-sugestao-use-case'
import { ListSugestaoUseCase } from '../list-sugestao/list-sugestao-use-case'

class DeleteSugestaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteSugestaoUseCase = container.resolve(DeleteSugestaoUseCase)
    await deleteSugestaoUseCase.execute(id)


    // restore list with updated records

    const listSugestaoUseCase = container.resolve(ListSugestaoUseCase)
    const sugestoes = await listSugestaoUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(sugestoes)
  }
}

export { DeleteSugestaoController }
