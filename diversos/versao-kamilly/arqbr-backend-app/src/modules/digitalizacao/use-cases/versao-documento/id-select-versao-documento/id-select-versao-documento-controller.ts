import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectVersaoDocumentoUseCase } from './id-select-versao-documento-use-case'

class IdSelectVersaoDocumentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectVersaoDocumentoUseCase = container.resolve(IdSelectVersaoDocumentoUseCase)

    const versaoDocumento = await idSelectVersaoDocumentoUseCase.execute({
      id: id as string
    })

    return response.json(versaoDocumento.data)
  }
}

export { IdSelectVersaoDocumentoController }
