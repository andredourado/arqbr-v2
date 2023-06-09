import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListCampoDocumentoUseCase } from './list-campo-documento-use-case'

class ListCampoDocumentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listCampoDocumentoUseCase = container.resolve(ListCampoDocumentoUseCase)

    const camposDocumento = await listCampoDocumentoUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(camposDocumento)
  }
}

export { ListCampoDocumentoController }
