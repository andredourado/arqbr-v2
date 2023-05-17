import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectCampoDocumentoUseCase } from './id-select-campo-documento-use-case'

class IdSelectCampoDocumentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectCampoDocumentoUseCase = container.resolve(IdSelectCampoDocumentoUseCase)

    const campoDocumento = await idSelectCampoDocumentoUseCase.execute({
      id: id as string
    })

    return response.json(campoDocumento.data)
  }
}

export { IdSelectCampoDocumentoController }
