import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetDocumentoUseCase } from './get-documento-use-case'

class GetDocumentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getDocumentoUseCase = container.resolve(GetDocumentoUseCase)
    const documento = await getDocumentoUseCase.execute(id)

    return response.status(documento.statusCode).json(documento.data)
  }
}

export { GetDocumentoController }
