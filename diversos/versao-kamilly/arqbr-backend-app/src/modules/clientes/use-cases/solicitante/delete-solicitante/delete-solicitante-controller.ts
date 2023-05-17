import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteSolicitanteUseCase } from './delete-solicitante-use-case'
import { ListSolicitanteUseCase } from '../list-solicitante/list-solicitante-use-case'

class DeleteSolicitanteController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteSolicitanteUseCase = container.resolve(DeleteSolicitanteUseCase)
    await deleteSolicitanteUseCase.execute(id)


    // restore list with updated records

    const listSolicitanteUseCase = container.resolve(ListSolicitanteUseCase)
    const solicitantes = await listSolicitanteUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(solicitantes)
  }
}

export { DeleteSolicitanteController }
