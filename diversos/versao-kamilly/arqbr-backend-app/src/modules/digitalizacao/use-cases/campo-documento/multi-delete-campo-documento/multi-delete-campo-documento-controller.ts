import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteCampoDocumentoUseCase } from './multi-delete-campo-documento-use-case'
import { ListCampoDocumentoUseCase } from '../list-campo-documento/list-campo-documento-use-case'

class MultiDeleteCampoDocumentoController {
  async handle(request: Request, response: Response ): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteCampoDocumentoUseCase = container.resolve(MultiDeleteCampoDocumentoUseCase)
    await multiDeleteCampoDocumentoUseCase.execute(ids)


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

export { MultiDeleteCampoDocumentoController }
