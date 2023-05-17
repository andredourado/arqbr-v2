import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteTipoDocumentoUseCase } from './delete-tipo-documento-use-case'
import { ListTipoDocumentoUseCase } from '../list-tipo-documento/list-tipo-documento-use-case'

class DeleteTipoDocumentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteTipoDocumentoUseCase = container.resolve(DeleteTipoDocumentoUseCase)
    await deleteTipoDocumentoUseCase.execute(id)


    // restore list with updated records

    const listTipoDocumentoUseCase = container.resolve(ListTipoDocumentoUseCase)
    const tiposDocumento = await listTipoDocumentoUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(tiposDocumento)
  }
}

export { DeleteTipoDocumentoController }
