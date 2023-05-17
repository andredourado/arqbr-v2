import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectDocumentoDigitalCampoUseCase } from './id-select-documento-digital-campo-use-case'

class IdSelectDocumentoDigitalCampoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectDocumentoDigitalCampoUseCase = container.resolve(IdSelectDocumentoDigitalCampoUseCase)

    const documentoDigitalCampo = await idSelectDocumentoDigitalCampoUseCase.execute({
      id: id as string
    })

    return response.json(documentoDigitalCampo.data)
  }
}

export { IdSelectDocumentoDigitalCampoController }
