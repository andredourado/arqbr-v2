import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListDocumentoDigitalCampoUseCase } from './list-documento-digital-campo-use-case'

class ListDocumentoDigitalCampoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listDocumentoDigitalCampoUseCase = container.resolve(ListDocumentoDigitalCampoUseCase)

    const documentosDigitaisCampos = await listDocumentoDigitalCampoUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as any
    })

    return response.json(documentosDigitaisCampos)
  }
}

export { ListDocumentoDigitalCampoController }
