import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { QuebraManualListDocumentosUseCase } from './quebra-manual-list-documentos-use-case'

class QuebraManualListDocumentosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const quebraManualListDocumentosUseCase = container.resolve(QuebraManualListDocumentosUseCase)

    const quebraManualListDocumentos = await quebraManualListDocumentosUseCase.execute()

    return response.status(quebraManualListDocumentos.statusCode).send(quebraManualListDocumentos)
  }
}

export { QuebraManualListDocumentosController }
