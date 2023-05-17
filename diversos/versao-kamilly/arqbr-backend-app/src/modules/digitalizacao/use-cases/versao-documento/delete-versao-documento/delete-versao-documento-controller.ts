import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteVersaoDocumentoUseCase } from './delete-versao-documento-use-case'
import { ListVersaoDocumentoUseCase } from '../list-versao-documento/list-versao-documento-use-case'

class DeleteVersaoDocumentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteVersaoDocumentoUseCase = container.resolve(DeleteVersaoDocumentoUseCase)
    await deleteVersaoDocumentoUseCase.execute(id)


    // restore list with updated records

    const listVersaoDocumentoUseCase = container.resolve(ListVersaoDocumentoUseCase)
    const versoesDocumento = await listVersaoDocumentoUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(versoesDocumento)
  }
}

export { DeleteVersaoDocumentoController }
