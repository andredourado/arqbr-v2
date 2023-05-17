import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteFuncaoUseCase } from './delete-funcao-use-case'
import { ListFuncaoUseCase } from '../list-funcao/list-funcao-use-case'

class DeleteFuncaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteFuncaoUseCase = container.resolve(DeleteFuncaoUseCase)
    await deleteFuncaoUseCase.execute(id)


    // restore list with updated records

    const listFuncaoUseCase = container.resolve(ListFuncaoUseCase)
    const funcoes = await listFuncaoUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(funcoes)
  }
}

export { DeleteFuncaoController }
