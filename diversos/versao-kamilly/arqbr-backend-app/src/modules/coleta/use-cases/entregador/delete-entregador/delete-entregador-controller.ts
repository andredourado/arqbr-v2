import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteEntregadorUseCase } from './delete-entregador-use-case'
import { ListEntregadorUseCase } from '../list-entregador/list-entregador-use-case'

class DeleteEntregadorController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteEntregadorUseCase = container.resolve(DeleteEntregadorUseCase)
    await deleteEntregadorUseCase.execute(id)


    // restore list with updated records

    const listEntregadorUseCase = container.resolve(ListEntregadorUseCase)
    const entregadores = await listEntregadorUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(entregadores)
  }
}

export { DeleteEntregadorController }
