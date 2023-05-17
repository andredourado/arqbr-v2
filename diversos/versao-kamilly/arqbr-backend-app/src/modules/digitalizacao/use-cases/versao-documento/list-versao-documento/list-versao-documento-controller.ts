import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListVersaoDocumentoUseCase } from './list-versao-documento-use-case'

class ListVersaoDocumentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order
    } = request.query

    const listVersaoDocumentoUseCase = container.resolve(ListVersaoDocumentoUseCase)

    const versoesDocumento = await listVersaoDocumentoUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string
    })

    return response.json(versoesDocumento)
  }
}

export { ListVersaoDocumentoController }
