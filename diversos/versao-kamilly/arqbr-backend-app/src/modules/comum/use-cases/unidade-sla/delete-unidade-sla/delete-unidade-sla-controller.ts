import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteUnidadeSlaUseCase } from './delete-unidade-sla-use-case'
import { ListUnidadeSlaUseCase } from '../list-unidade-sla/list-unidade-sla-use-case'

class DeleteUnidadeSlaController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteUnidadeSlaUseCase = container.resolve(DeleteUnidadeSlaUseCase)
    await deleteUnidadeSlaUseCase.execute(id)


    // restore list with updated records

    const listUnidadeSlaUseCase = container.resolve(ListUnidadeSlaUseCase)
    const unidadesSla = await listUnidadeSlaUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(unidadesSla)
  }
}

export { DeleteUnidadeSlaController }
