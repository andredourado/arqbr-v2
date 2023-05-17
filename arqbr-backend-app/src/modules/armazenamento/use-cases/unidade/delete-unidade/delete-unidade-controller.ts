import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteUnidadeUseCase } from './delete-unidade-use-case'
import { ListUnidadeUseCase } from '../list-unidade/list-unidade-use-case'

class DeleteUnidadeController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteUnidadeUseCase = container.resolve(DeleteUnidadeUseCase)
    await deleteUnidadeUseCase.execute(id)


    // restore list with updated records

    const listUnidadeUseCase = container.resolve(ListUnidadeUseCase)
    const unidades = await listUnidadeUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(unidades)
  }
}

export { DeleteUnidadeController }
