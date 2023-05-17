import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectDocumentoDigitalUseCase } from './select-documento-digital-use-case'

class SelectDocumentoDigitalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectDocumentoDigitalUseCase = container.resolve(SelectDocumentoDigitalUseCase)

    const documentosDigitais = await selectDocumentoDigitalUseCase.execute({
      filter: filter as string,
    })

    return response.json(documentosDigitais)
  }
}

export { SelectDocumentoDigitalController }
