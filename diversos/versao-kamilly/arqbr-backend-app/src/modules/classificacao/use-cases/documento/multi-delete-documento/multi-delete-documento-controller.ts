import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteDocumentoUseCase } from './multi-delete-documento-use-case'
import { ListDocumentoUseCase } from '../list-documento/list-documento-use-case'

class MultiDeleteDocumentoController {
  async handle(request: Request, response: Response ): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteDocumentoUseCase = container.resolve(MultiDeleteDocumentoUseCase)
    await multiDeleteDocumentoUseCase.execute(ids)


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

export { MultiDeleteDocumentoController }
