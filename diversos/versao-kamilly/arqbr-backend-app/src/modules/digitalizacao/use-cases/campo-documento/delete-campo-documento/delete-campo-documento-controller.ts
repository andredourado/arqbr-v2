import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteCampoDocumentoUseCase } from './delete-campo-documento-use-case'
import { ListCampoDocumentoUseCase } from '../list-campo-documento/list-campo-documento-use-case'

class DeleteCampoDocumentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteCampoDocumentoUseCase = container.resolve(DeleteCampoDocumentoUseCase)
    await deleteCampoDocumentoUseCase.execute(id)


    // restore list with updated records

    const listCampoDocumentoUseCase = container.resolve(ListCampoDocumentoUseCase)
    const camposDocumento = await listCampoDocumentoUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(camposDocumento)
  }
}

export { DeleteCampoDocumentoController }
