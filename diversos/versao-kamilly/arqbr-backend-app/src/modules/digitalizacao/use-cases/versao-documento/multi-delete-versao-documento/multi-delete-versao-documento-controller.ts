import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteVersaoDocumentoUseCase } from './multi-delete-versao-documento-use-case'
import { ListVersaoDocumentoUseCase } from '../list-versao-documento/list-versao-documento-use-case'

class MultiDeleteVersaoDocumentoController {
  async handle(request: Request, response: Response ): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteVersaoDocumentoUseCase = container.resolve(MultiDeleteVersaoDocumentoUseCase)
    await multiDeleteVersaoDocumentoUseCase.execute(ids)


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

export { MultiDeleteVersaoDocumentoController }
