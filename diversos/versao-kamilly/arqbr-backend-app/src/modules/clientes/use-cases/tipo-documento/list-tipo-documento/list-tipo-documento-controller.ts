import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListTipoDocumentoUseCase } from './list-tipo-documento-use-case'

class ListTipoDocumentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order
    } = request.query

    const listTipoDocumentoUseCase = container.resolve(ListTipoDocumentoUseCase)

    const tiposDocumento = await listTipoDocumentoUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string
    })

    return response.json(tiposDocumento)
  }
}

export { ListTipoDocumentoController }
