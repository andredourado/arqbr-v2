import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteAfastamentoUseCase } from './delete-afastamento-use-case'
import { ListAfastamentoUseCase } from '../list-afastamento/list-afastamento-use-case'

class DeleteAfastamentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteAfastamentoUseCase = container.resolve(DeleteAfastamentoUseCase)
    await deleteAfastamentoUseCase.execute(id)


    // restore list with updated records

    const listAfastamentoUseCase = container.resolve(ListAfastamentoUseCase)
    const afastamentos = await listAfastamentoUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(afastamentos)
  }
}

export { DeleteAfastamentoController }
