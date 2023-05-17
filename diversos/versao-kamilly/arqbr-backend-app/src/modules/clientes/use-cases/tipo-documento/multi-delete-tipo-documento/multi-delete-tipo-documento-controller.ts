import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteTipoDocumentoUseCase } from './multi-delete-tipo-documento-use-case'
import { ListTipoDocumentoUseCase } from '../list-tipo-documento/list-tipo-documento-use-case'

class MultiDeleteTipoDocumentoController {
  async handle(request: Request, response: Response ): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteTipoDocumentoUseCase = container.resolve(MultiDeleteTipoDocumentoUseCase)
    await multiDeleteTipoDocumentoUseCase.execute(ids)


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

export { MultiDeleteTipoDocumentoController }
