import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteTipoAfastamentoUseCase } from './delete-tipo-afastamento-use-case'
import { ListTipoAfastamentoUseCase } from '../list-tipo-afastamento/list-tipo-afastamento-use-case'

class DeleteTipoAfastamentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteTipoAfastamentoUseCase = container.resolve(DeleteTipoAfastamentoUseCase)
    await deleteTipoAfastamentoUseCase.execute(id)


    // restore list with updated records

    const listTipoAfastamentoUseCase = container.resolve(ListTipoAfastamentoUseCase)
    const tiposAfastamento = await listTipoAfastamentoUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(tiposAfastamento)
  }
}

export { DeleteTipoAfastamentoController }
