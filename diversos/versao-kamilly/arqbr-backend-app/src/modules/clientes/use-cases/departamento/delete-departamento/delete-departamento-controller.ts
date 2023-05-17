import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteDepartamentoUseCase } from './delete-departamento-use-case'
import { ListDepartamentoUseCase } from '../list-departamento/list-departamento-use-case'

class DeleteDepartamentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteDepartamentoUseCase = container.resolve(DeleteDepartamentoUseCase)
    await deleteDepartamentoUseCase.execute(id)


    // restore list with updated records

    const listDepartamentoUseCase = container.resolve(ListDepartamentoUseCase)
    const departamentos = await listDepartamentoUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(departamentos)
  }
}

export { DeleteDepartamentoController }
