import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteServicoContratadoUseCase } from './delete-servico-contratado-use-case'
import { ListServicoContratadoUseCase } from '../list-servico-contratado/list-servico-contratado-use-case'

class DeleteServicoContratadoController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteServicoContratadoUseCase = container.resolve(DeleteServicoContratadoUseCase)
    await deleteServicoContratadoUseCase.execute(id)


    // restore list with updated records

    const listServicoContratadoUseCase = container.resolve(ListServicoContratadoUseCase)
    const servicosContratados = await listServicoContratadoUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(servicosContratados)
  }
}

export { DeleteServicoContratadoController }
