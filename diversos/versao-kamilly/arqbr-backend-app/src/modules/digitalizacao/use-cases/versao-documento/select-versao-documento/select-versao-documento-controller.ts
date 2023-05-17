import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectVersaoDocumentoUseCase } from './select-versao-documento-use-case'

class SelectVersaoDocumentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectVersaoDocumentoUseCase = container.resolve(SelectVersaoDocumentoUseCase)

    const versoesDocumento = await selectVersaoDocumentoUseCase.execute({
      filter: filter as string,
    })

    return response.json(versoesDocumento)
  }
}

export { SelectVersaoDocumentoController }
