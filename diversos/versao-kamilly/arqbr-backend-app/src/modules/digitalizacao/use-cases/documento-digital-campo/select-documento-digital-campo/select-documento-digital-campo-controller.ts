import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectDocumentoDigitalCampoUseCase } from './select-documento-digital-campo-use-case'

class SelectDocumentoDigitalCampoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectDocumentoDigitalCampoUseCase = container.resolve(SelectDocumentoDigitalCampoUseCase)

    const documentosDigitaisCampos = await selectDocumentoDigitalCampoUseCase.execute({
      filter: filter as string,
    })

    return response.json(documentosDigitaisCampos)
  }
}

export { SelectDocumentoDigitalCampoController }
