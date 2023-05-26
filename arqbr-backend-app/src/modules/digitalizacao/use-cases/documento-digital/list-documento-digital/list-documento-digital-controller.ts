import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListDocumentoDigitalUseCase } from './list-documento-digital-use-case'

class ListDocumentoDigitalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter,
      tipoDocumentoId
    } = request.body

    const user = request.user

    const listDocumentoDigitalUseCase = container.resolve(ListDocumentoDigitalUseCase)

    const documentosDigitais = await listDocumentoDigitalUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as any,
      tipoDocumentoId: tipoDocumentoId as string,
      user
    })

    return response.json(documentosDigitais)
  }
}

export { ListDocumentoDigitalController }
