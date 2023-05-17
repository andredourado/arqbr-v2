import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountByTipoDocumentoDocumentoDigitalUseCase } from './count-by-tipo-documento-documento-digital-use-case'

class CountByTipoDocumentoDocumentoDigitalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user = request.user

    const countByTipoDocumentoDocumentoDigitalUseCase = container.resolve(CountByTipoDocumentoDocumentoDigitalUseCase)

    const countByTipoDocumento = await countByTipoDocumentoDocumentoDigitalUseCase.execute({
      user
    })

    return response.status(countByTipoDocumento.statusCode).json(countByTipoDocumento)
  }
}

export { CountByTipoDocumentoDocumentoDigitalController }
