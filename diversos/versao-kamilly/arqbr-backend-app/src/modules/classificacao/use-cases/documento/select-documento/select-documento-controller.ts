import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectDocumentoUseCase } from './select-documento-use-case'

class SelectDocumentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectDocumentoUseCase = container.resolve(SelectDocumentoUseCase)

    const documentos = await selectDocumentoUseCase.execute({
      filter: filter as string,
    })

    return response.json(documentos)
  }
}

export { SelectDocumentoController }
