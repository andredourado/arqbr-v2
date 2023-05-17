import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetVersaoDocumentoUseCase } from './get-versao-documento-use-case'

class GetVersaoDocumentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getVersaoDocumentoUseCase = container.resolve(GetVersaoDocumentoUseCase)
    const versaoDocumento = await getVersaoDocumentoUseCase.execute(id)

    return response.status(versaoDocumento.statusCode).json(versaoDocumento)
  }
}

export { GetVersaoDocumentoController }
