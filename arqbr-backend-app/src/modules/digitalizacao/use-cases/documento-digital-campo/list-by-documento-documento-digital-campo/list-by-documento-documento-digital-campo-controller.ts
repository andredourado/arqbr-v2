import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListByDocumentoDocumentoDigitalCampoUseCase } from './list-by-documento-documento-digital-campo-use-case'

class ListByDocumentoDocumentoDigitalCampoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const documentoDigitalId = request.params.documentoDigitalId

    const listByDocumentoDocumentoDigitalCampoUseCase = container.resolve(ListByDocumentoDocumentoDigitalCampoUseCase)

    const documentosDigitaisCampos = await listByDocumentoDocumentoDigitalCampoUseCase.execute({
      documentoDigitalId: documentoDigitalId as string
    })

    return response.json(documentosDigitaisCampos)
  }
}

export { ListByDocumentoDocumentoDigitalCampoController }
