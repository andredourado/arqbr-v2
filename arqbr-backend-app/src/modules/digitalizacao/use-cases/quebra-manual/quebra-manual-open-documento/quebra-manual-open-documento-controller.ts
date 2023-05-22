import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { QuebraManualOpenDocumentoUseCase } from './quebra-manual-open-documento-use-case'

class QuebraManualOpenDocumentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const file = request.params.file

    const quebraManualOpenDocumentoUseCase = container.resolve(QuebraManualOpenDocumentoUseCase)

    const quebraManualOpenDocumento = await quebraManualOpenDocumentoUseCase.execute(file)

    return response.status(quebraManualOpenDocumento.statusCode).send(quebraManualOpenDocumento)
  }
}

export { QuebraManualOpenDocumentoController }
