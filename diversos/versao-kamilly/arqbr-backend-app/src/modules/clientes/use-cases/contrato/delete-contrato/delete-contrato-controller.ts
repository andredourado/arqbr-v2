import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteContratoUseCase } from './delete-contrato-use-case'
import { ListContratoUseCase } from '../list-contrato/list-contrato-use-case'

class DeleteContratoController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteContratoUseCase = container.resolve(DeleteContratoUseCase)
    await deleteContratoUseCase.execute(id)


    // restore list with updated records

    const listContratoUseCase = container.resolve(ListContratoUseCase)
    const contratos = await listContratoUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(contratos)
  }
}

export { DeleteContratoController }
