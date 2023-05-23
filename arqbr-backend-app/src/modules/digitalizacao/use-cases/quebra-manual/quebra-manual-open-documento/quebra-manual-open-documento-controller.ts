import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { QuebraManualOpenDocumentoUseCase } from './quebra-manual-open-documento-use-case'

class QuebraManualOpenDocumentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file, page } = request.body

    const quebraManualOpenDocumentoUseCase = container.resolve(QuebraManualOpenDocumentoUseCase)

    const quebraManualOpenDocumento = await quebraManualOpenDocumentoUseCase.execute(file, page)

    return response.status(quebraManualOpenDocumento.statusCode).send(quebraManualOpenDocumento)
  }
}

export { QuebraManualOpenDocumentoController }
