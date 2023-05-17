import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListDocumentoUseCase } from './list-documento-use-case'

class ListDocumentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order
    } = request.query

    const listDocumentoUseCase = container.resolve(ListDocumentoUseCase)

    const documentos = await listDocumentoUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string
    })

    return response.json(documentos)
  }
}

export { ListDocumentoController }
