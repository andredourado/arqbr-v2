import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteDocumentoUseCase } from './delete-documento-use-case'
import { ListDocumentoUseCase } from '../list-documento/list-documento-use-case'

class DeleteDocumentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteDocumentoUseCase = container.resolve(DeleteDocumentoUseCase)
    await deleteDocumentoUseCase.execute(id)


    // restore list with updated records

    const listDocumentoUseCase = container.resolve(ListDocumentoUseCase)
    const documentos = await listDocumentoUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(documentos)
  }
}

export { DeleteDocumentoController }
