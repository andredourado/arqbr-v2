import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteServicoUseCase } from './delete-servico-use-case'
import { ListServicoUseCase } from '../list-servico/list-servico-use-case'

class DeleteServicoController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteServicoUseCase = container.resolve(DeleteServicoUseCase)
    await deleteServicoUseCase.execute(id)


    // restore list with updated records

    const listServicoUseCase = container.resolve(ListServicoUseCase)
    const servicos = await listServicoUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(servicos)
  }
}

export { DeleteServicoController }
